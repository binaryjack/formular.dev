import { IReactiveManager } from '../../interfaces/i-reactive-manager'
import { convertPropertyToAttributeValue } from '../utils/reactive-utils'

/**
 * Syncs property value to attribute
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const syncPropertyToAttribute = function(
    this: IReactiveManager,
    componentId: string,
    propertyName: string,
    value: any
): void {
    const componentState = this.components.get(componentId)
    if (!componentState) return

    const config = componentState.properties.get(propertyName)
    if (!config?.attribute) return

    const attributeName = typeof config.attribute === 'string' ? config.attribute : propertyName
    const attributeValue = convertPropertyToAttributeValue(value, config.type)

    if (attributeValue === null) {
        componentState.element.removeAttribute(attributeName)
    } else {
        componentState.element.setAttribute(attributeName, attributeValue)
    }
}
