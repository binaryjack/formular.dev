/**
 * Test file to verify all symbols and interfaces are properly exported
 * This file should compile without errors if all exports are working correctly
 */

// Test Symbol imports
import { SConfigurationManager } from 'formular.dev.lib'

// Test Interface imports
import type { IConfigurationManager } from 'formular.dev.lib'

// Test usage example
console.log('All symbols and interfaces are properly exported!')

export type ExportTest = {
    symbols: typeof SConfigurationManager
    interfaces: IConfigurationManager
}
