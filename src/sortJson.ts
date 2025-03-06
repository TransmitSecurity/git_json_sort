import * as fs from "fs";

/**
 * Recursively sorts JSON keys in an object or array.
 * @param data - The JSON object or array to sort.
 * @returns The sorted JSON structure.
 */
function sortJson(data: any): any {
    if (Array.isArray(data)) {
        return data.map(sortJson); // Recursively process arrays
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
 * Reads, sorts, and writes a JSON file.
 * @param filePath - The path to the JSON file.
 */
function sortJsonFile(filePath: string): void {
    try {
        const rawData = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(rawData);
        const sortedData = sortJson(jsonData);
        const formattedJson = JSON.stringify(sortedData, null, 4); // Pretty-print JSON

        fs.writeFileSync(filePath, formattedJson, "utf8");
        console.log(`Sorted JSON saved to: ${filePath}`);
    } catch (error) {
        console.error("Error processing JSON:", (error as Error).message);
    }
}

// Command-line execution support
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("Usage: npm run sort <json_file>");
        process.exit(1);
    }
    sortJsonFile(args[0]);
}

export { sortJson, sortJsonFile };
