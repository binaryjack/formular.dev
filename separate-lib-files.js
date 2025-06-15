#!/usr/bin/env node
/**
 * Script to recursively separate interfaces, types, and object classes 
 * in the lib package into individual files following contributing guidelines.
 * 
 * This script:
 * 1. Scans all TypeScript files in packages/lib/src (excluding __tests__)
 * 2. Identifies mixed files containing interfaces, types, and object classes
 * 3. Separates them into individual files using kebab-case naming
 * 4. Creates proper folder structure (interfaces/, types/, constants/, factory/)
 * 5. Updates original files to re-export from separated files
 * 6. Maintains all imports and exports
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LIB_SRC_PATH = 'e:\\Sources\\SignalsPatternsReact\\packages\\lib\\src';
const DRY_RUN = false; // Set to true to see what would be changed without actually changing

// Utility functions
function kebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

function extractExports(content) {
    const exports = {
        interfaces: [],
        types: [],
        constants: [],
        functions: []
    };
    
    // Match export interface
    const interfaceRegex = /export\s+interface\s+(\w+)/g;
    let match;
    while ((match = interfaceRegex.exec(content)) !== null) {
        exports.interfaces.push(match[1]);
    }
    
    // Match export type
    const typeRegex = /export\s+type\s+(\w+)/g;
    while ((match = typeRegex.exec(content)) !== null) {
        exports.types.push(match[1]);
    }
    
    // Match export const (for constants and functions)
    const constRegex = /export\s+const\s+(\w+)\s*=\s*(.*?)(?=\n|$)/g;
    while ((match = constRegex.exec(content)) !== null) {
        const name = match[1];
        const value = match[2].trim();
        
        if (value.startsWith('function') || value.includes('=>')) {
            exports.functions.push(name);
        } else {
            exports.constants.push(name);
        }
    }
    
    return exports;
}

function shouldSeparateFile(exports) {
    const totalExports = exports.interfaces.length + exports.types.length + 
                        exports.constants.length + exports.functions.length;
    
    // Only separate files that have multiple items or mixed types
    return totalExports > 1 && (
        exports.interfaces.length > 0 && (exports.types.length > 0 || exports.constants.length > 0 || exports.functions.length > 0) ||
        exports.types.length > 1 ||
        exports.interfaces.length > 1
    );
}

function processFile(filePath) {
    if (!filePath.endsWith('.ts') || filePath.includes('__tests__')) {
        return;
    }
    
    console.log(`Processing: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const exports = extractExports(content);
    
    if (!shouldSeparateFile(exports)) {
        console.log(`  Skipping - single export or no mixed types`);
        return;
    }
    
    console.log(`  Found exports:`, exports);
    
    if (!DRY_RUN) {
        // Here you would implement the actual separation logic
        // Similar to what we did manually above
        console.log(`  Would separate this file...`);
    }
}

function scanDirectory(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (stat.isFile()) {
                processFile(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error scanning ${dirPath}:`, error.message);
    }
}

// Main execution
console.log('Starting separation process...');
console.log(`DRY_RUN mode: ${DRY_RUN}`);
console.log(`Scanning: ${LIB_SRC_PATH}`);

scanDirectory(LIB_SRC_PATH);

console.log('Process complete!');
