import { ITemplateEngineConfig } from '../../interfaces/i-template-engine-config'

/**
 * Gets current template engine configuration
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const getTemplateEngineConfig = function(this: any): ITemplateEngineConfig {
    return { ...this.currentConfig }
}
