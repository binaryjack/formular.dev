/**
 * @fileoverview Component lifecycle phases enum
 * Following CONTRIBUTING.md: Each enum in individual file with Enum suffix
 */

/**
 * Component lifecycle phases
 */
export enum ComponentLifecycleEnum {
    CREATED = 'created',
    CONNECTED = 'connected',
    ATTRIBUTE_CHANGED = 'attributeChanged',
    DISCONNECTED = 'disconnected',
    PROPERTY_CHANGED = 'propertyChanged',
    RENDERED = 'rendered'
}
