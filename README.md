# 📜 JSON Sorter - A Recursive JSON Sorting Tool

This project provides a Node.js TypeScript tool to recursively sort JSON files,
 ensuring stable key ordering across deeply nested structures.

- ✅ Handles nested objects
- ✅ Sorts arrays of objects by "path", "name", or "id"
- ✅ Batch processes multiple JSON files
- ✅ Supports inline sorting of a single file
- ✅ Git integration to auto-sort JSON before committing

## 📂 Folder Structure

```python
project-root/
├── src/
│   ├── sortJson.ts     # Main sorting script
├── unsorted/           # Place JSON files here for batch sorting
│   ├── example.json
├── sorted/             # Output folder for sorted JSON files
├── package.json        # Project metadata
├── tsconfig.json       # TypeScript config
├── .gitignore          # Git ignored files
├── .husky/             # Git hooks
├── README.md           # This file
```

## 📦 Installation

1️⃣ Clone this repository:

```sh
git clone https://github.com/your-repo/json-sorter.git
cd json-sorter
```

2️⃣ Install dependencies:

```sh
npm install
```

3️⃣ Compile TypeScript (optional, if using node dist/sortJson.js):

```sh
npm run build
```

## 🚀 Usage

1️⃣ Sort all JSON files in the unsorted/ folder

```sh
npm run sort
```

- ✅ Processes all JSON files in unsorted/
- ✅ Saves the sorted versions in sorted/

2️⃣ Sort a single file inline (modifies original file)

```sh
npm run sort -- -i path/to/file.json
```

✅ Sorts the specified file in place

3️⃣ Run the compiled JavaScript version

If you've run npm run build, you can execute:

```sh
node dist/sortJson.js
```

## 🔗 Git Integration: Auto-sort JSON Before Committing

To ensure all committed JSON files are sorted, set up a Git pre-commit hook using Husky.

1️⃣ Install Husky and lint-staged:

```sh
npm install --save-dev husky lint-staged
```

2️⃣ Add Husky to Your package.json
In your package.json, add the following:

```json
"lint-staged": {
    "*.json": "npm run sort -- -i"
}
```

**OR** to sort only files in the `sorted/` folder, set the package.json as follows:

```json
"lint-staged": {
    "sorted/**/*.json": [
        "npm run sort -- -i"
    ]
}
```

Now, whenever you commit, all JSON files will be automatically sorted before being staged. 🎯

## 🎯 Example 1: Manual Workflow

```sh
# Add JSON files
echo '{"b":2,"a":1}' > unsorted/sample.json

# Sort all JSON files
npm run sort

# Commit sorted JSON files
git add sorted/*
git commit -m "Sorted JSON files"
```

## 🎯 Example 2: Fully Automated Workflow

```sh
# Add a new unsorted JSON file (this remains untouched)
echo '{"z":3,"a":1,"b":2}' > unsorted/example.json

# Copy the file into sorted/ before committing
cp unsorted/example.json sorted/example.json

# The original file stays unsorted, while sorted/ is prepared for tracking
# Stage the file
git add sorted/example.json

# At this point, the file is staged before sorting happens.

#Try to commit
git commit -m "Added sorted JSON"

# If Husky modified the file, re-add it and commit again
git add sorted/example.json
git commit -m "Added sorted JSON"
```

## 🛠️ Customization

- Modify "path", "name", "id" sorting priority in src/sortJson.ts
- Adjust "sorted" output directory as needed
Set different sorting rules for special cases

## 🔍 Comparison: TypeScript JSON Sorter vs. jq Tool

Both our TypeScript JSON sorter and the jq CLI tool can sort JSON, but they differ in capabilities, flexibility, and ease of integration.

## **Feature Comparison Table**

| Feature                  | TypeScript JSON Sorter | `jq` Tool (`jq --sort-keys`) |
|--------------------------|----------------------|---------------------------|
| **Recursive Key Sorting** | ✅ Yes | ✅ Yes |
| **Sorts Arrays of Objects** | ✅ Yes, by `"path"`, `"name"`, `"id"` | ❌ No, just keeps order |
| **Sorts Keys at Any Depth** | ✅ Yes | ✅ Yes |
| **Preserves Formatting (Indentation)** | ✅ Yes (pretty-printing enabled) | ✅ Yes |
| **Batch Processing (Multiple Files)** | ✅ Yes (processes all files in `unsorted/`) | ❌ No (must run per file) |
| **Modifies Files Inline** | ✅ Yes (`-i` flag) | ✅ Yes (with `jq > file`) |
| **Filters or Extracts Data** | ❌ No | ✅ Yes |
| **Git Pre-Commit Hook Friendly** | ✅ Yes (via Husky) | ✅ Possible, but manual setup needed |
| **Platform Compatibility** | ✅ Cross-platform (Node.js) | ✅ Cross-platform (Linux/macOS/WSL) |
| **Command Complexity** | ✅ Simple (`npm run sort`) | ❌ Complex (`jq --sort-keys '.' file.json > sorted.json`) |
| **Ease of Integration with Node.js Projects** | ✅ Seamless | ❌ Requires shell commands |

## 📜 License

This project is licensed under the MIT License.
