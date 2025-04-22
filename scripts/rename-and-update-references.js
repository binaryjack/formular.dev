const fs = require('fs')
const path = require('path')

// Utility to convert PascalCase or camelCase to slugified style
const slugify = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Add dashes between camelCase or PascalCase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Handle consecutive uppercase letters
        .toLowerCase()
}

// Recursively rename files and update references
const renameFilesAndUpdateReferences = (dir) => {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
        const fullPath = path.join(dir, file)

        if (fs.statSync(fullPath).isDirectory()) {
            // Recurse into subdirectories
            renameFilesAndUpdateReferences(fullPath)
        } else {
            // Rename file
            const newFileName = slugify(file.replace(/\.[^/.]+$/, '')) + path.extname(file)
            const newFullPath = path.join(dir, newFileName)

            if (newFileName !== file) {
                fs.renameSync(fullPath, newFullPath)
                console.log(`Renamed: ${fullPath} -> ${newFullPath}`)

                // Update references in the codebase
                updateReferences(dir, file, newFileName)
            }
        }
    })
}

// Update references in all files in the directory
const updateReferences = (dir, oldFileName, newFileName) => {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
        const fullPath = path.join(dir, file)

        if (fs.statSync(fullPath).isDirectory()) {
            // Recurse into subdirectories
            updateReferences(fullPath, oldFileName, newFileName)
        } else if (/\.(js|ts|tsx|jsx|json|html|css|scss)$/.test(file)) {
            // Update references in supported file types
            let content = fs.readFileSync(fullPath, 'utf8')
            const updatedContent = content.replace(new RegExp(oldFileName, 'g'), newFileName)

            if (content !== updatedContent) {
                fs.writeFileSync(fullPath, updatedContent, 'utf8')
                console.log(`Updated references in: ${fullPath}`)
            }
        }
    })
}

// Define the root directory of your codebase
const rootDirectory = 'e:/Sources/SignalsPatternsReact'

// Start the renaming process
renameFilesAndUpdateReferences(rootDirectory)

console.log('Renaming and reference updates completed!')
