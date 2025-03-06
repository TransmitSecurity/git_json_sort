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

2️⃣ Enable Husky hooks:

```sh
npx husky install
```

3️⃣ Add a Git pre-commit hook:

```sh
npx husky add .husky/pre-commit "npx lint-staged"
```

4️⃣ Modify package.json to enforce sorting before commits:

```json
"lint-staged": {
    "*.json": "npm run sort -- -i"
}
```

Now, whenever you commit, all JSON files will be automatically sorted before being staged. 🎯

## 🎯 Example: Full Workflow

```sh
# Add JSON files
echo '{"b":2,"a":1}' > unsorted/sample.json

# Sort all JSON files
npm run sort

# Commit sorted JSON files
git add sorted/*
git commit -m "Sorted JSON files"
```

## 🛠️ Customization

Modify "path", "name", "id" sorting priority in src/sortJson.ts
Adjust "sorted" output directory as needed
Set different sorting rules for special cases

## 📜 License

This project is licensed under the MIT License.
