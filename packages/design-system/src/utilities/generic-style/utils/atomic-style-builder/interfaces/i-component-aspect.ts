import type { ComponentSizeType } from '../../../../../types'

/**
 * Atomic Component Aspect Configuration
 * Extended version for the atomic style system with additional properties
 */
export interface IComponentAspect {
    size?: ComponentSizeType
    rounded?: boolean
    borders?: boolean
    width?: string
    height?: string
    padding?: string
    margin?: string
}
