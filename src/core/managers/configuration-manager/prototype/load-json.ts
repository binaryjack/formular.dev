import { IConfiguration } from '../interfaces'
import { IConfigurationManager } from '../interfaces/i-configuration-manager'

export const loadJson = async function (this: IConfigurationManager, path: string): Promise<void> {
    try {
        let data: string // Check if running in Node.js environment
        const isNodeJs = typeof globalThis !== 'undefined' && globalThis.process?.versions?.node

        if (isNodeJs) {
            // Node.js environment - use dynamic import to avoid bundling issues
            const { readFile } = await import('fs/promises')
            data = await readFile(path, 'utf-8')
        } else {
            // Browser environment - use fetch API
            const response = await fetch(path)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            data = await response.text()
        }

        // Parse and validate the JSON
        const json = JSON.parse(data) as IConfiguration

        // Validate that it has required properties
        if (!json.name || !json.targetEnvironment) {
            throw new Error(
                'Invalid configuration: missing required properties (name, targetEnvironment)'
            )
        }

        // Set the configuration using the name from the JSON
        this.setConfiguration(json.name, json)
    } catch (error) {
        console.error(`Failed to load JSON configuration from ${path}:`, error)
        throw error
    }
}
