import * as fs from "fs";
import * as path from "path";

/**
 * Recursively sorts JSON keys in an object or array.
 * If an array contains objects, it attempts to sort them based on "path", "name", or "id".
 * @param data - The JSON object or array to sort.
 * @returns The sorted JSON structure.
 */
function sortJson(data: any): any {
    if (Array.isArray(data)) {
        // Check if all elements in the array are objects
        if (data.every((item) => typeof item === "object" && item !== null)) {
            // Determine the key to sort by (first found in the priority list)
            const sortKey = ["path", "name", "id"].find((key) =>
                data.every((obj) => key in obj)
            );

            if (sortKey) {
                // Sort the array based on the chosen key
                return data
                    .map(sortJson) // Sort keys inside each object first
                    .sort((a, b) => {
                        if (a[sortKey] < b[sortKey]) return -1;
                        if (a[sortKey] > b[sortKey]) return 1;
                        return 0;
                    });
            }
        }
        return data.map(sortJson); // Sort nested objects inside the array
    } else if (typeof data === "object" && data !== null) {
        return Object.keys(data)
            .sort()
            .reduce((sortedObj: any, key: string) => {
                sortedObj[key] = sortJson(data[key]); // Recursively sort nested objects
                return sortedObj;
            }, {});
    }
    return data; // Return non-object values as-is
}

/**
 * Reads a JSON file, sorts it, and writes back to the same file.
 * @param filePath - Path of the JSON file to be sorted inline.
 */
function sortJsonInline(filePath: string): void {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: File not found -> ${filePath}`);
        process.exit(1);
    }

    try {
        const rawData = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(rawData);
        const sortedData = sortJson(jsonData);
        const formattedJson = JSON.stringify(sortedData, null, 4); // Pretty-print JSON

        fs.writeFileSync(filePath, formattedJson, "utf8");
        console.log(`✅ Successfully sorted file: ${filePath}`);
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, (error as Error).message);
    }
}

/**
 * Reads JSON files from the "unsorted" folder, sorts them, and writes to the "sorted" folder.
 */
function processJsonFiles(): void {
    const inputDir = path.join(__dirname, "../unsorted");
    const outputDir = path.join(__dirname, "../sorted");

    // Ensure the sorted folder exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read all JSON files from the unsorted folder
    const files = fs.readdirSync(inputDir).filter(file => file.endsWith(".json"));

    if (files.length === 0) {
        console.log("⚠️ No JSON files found in the 'unsorted' folder.");
        return;
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file);

        try {
            const rawData = fs.readFileSync(inputFilePath, "utf8");
            const jsonData = JSON.parse(rawData);
            const sortedData = sortJson(jsonData);
            const formattedJson = JSON.stringify(sortedData, null, 4); // Pretty-print JSON

            fs.writeFileSync(outputFilePath, formattedJson, "utf8");
            console.log(`✅ Sorted JSON saved: ${outputFilePath}`);
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, (error as Error).message);
        }
    });

    console.log("✅ Sorting completed. Check the 'sorted' folder for output files.");
}

// Command-line execution support
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 2 && (args[0] === "-i" || args[0] === "--inline")) {
        sortJsonInline(args[1]);
    } else {
        console.log("\n📌 Usage Instructions:");
        console.log("  npm run sort               # Sorts all JSON files in 'unsorted/' and saves to 'sorted/'");
        console.log("  npm run sort -- -i <file>  # Sorts a single JSON file in-place\n");
        processJsonFiles();
    }
}

export { sortJson, processJsonFiles, sortJsonInline };
