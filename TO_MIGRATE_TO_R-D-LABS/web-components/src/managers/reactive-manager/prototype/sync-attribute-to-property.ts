import { IReactiveManager } from '../../interfaces/i-reactive-manager'
import { convertAttributeToPropertyValue } from '../utils/reactive-utils'

/**
 * Syncs attribute value to property
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const syncAttributeToProperty = function(
    this: IReactiveManager,
    componentId: string,
    attributeName: string,
    value: string | null
): void {
    const componentState = this.components.get(componentId)
    if (!componentState) return

    // Find property mapped to this attribute
    for (const [propName, config] of componentState.properties) {
        const attributeMapping = typeof config.attribute === 'string' ? config.attribute : propName
        
        if (attributeMapping === attributeName) {
            const convertedValue = convertAttributeToPropertyValue(value, config.type)
            ;(componentState.element as any)[propName] = convertedValue
            break
        }
    }
}
