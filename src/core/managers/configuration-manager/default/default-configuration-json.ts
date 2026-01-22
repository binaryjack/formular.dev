/**
 * Raw JSON configuration export
 * This exports the default configuration as a JSON object that can be used
 * for serialization, storage, or as a template for custom configurations.
 */

import defaultConfigJson from './default-configuration.json'

// Export the raw JSON configuration
export const defaultConfigurationJson = defaultConfigJson

// Export as a JSON string for easy serialization
export const defaultConfigurationJsonString = JSON.stringify(defaultConfigJson, null, 2)

// Type-safe export with proper typing
export { defaultConfigJson as rawDefaultConfiguration }

// Default configuration export as JSON
export { defaultConfigJson }
