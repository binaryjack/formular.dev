// Test color mapping for outlined buttons
const libExports = require('./packages/lib/dist/formular-dev.cjs.js');

console.log('Available exports from lib:', Object.keys(libExports));

// Check if we have the functions we need
console.log('compositeStyle:', typeof libExports.compositeStyle);
console.log('generateStyle:', typeof libExports.generateStyle);
