/**
 * Batch update configuration interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IBatchUpdateConfig {
    debounceTime: number
    maxBatchSize: number
    enableLogging: boolean
}
