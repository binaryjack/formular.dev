/**
 * Template engine configuration interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface ITemplateEngineConfig {
    /** Enable template caching */
    enableCaching: boolean
    /** Enable XSS protection */
    enableSanitization: boolean
    /** Debug mode for development */
    debugMode: boolean
    /** Maximum cache size */
    maxCacheSize: number
}
