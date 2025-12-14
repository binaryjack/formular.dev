/**
 * Manager factory configuration interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IManagerFactoryConfig {
    enableDebugMode?: boolean
    batchUpdateDelay?: number
    templateCacheSize?: number
    notificationHistorySize?: number
}
