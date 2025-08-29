import type { ComponentSizeType } from '../../types'

/**
 * Component visual aspect configuration
 */
export interface IComponentAspect {
    size?: ComponentSizeType
    rounded?: boolean
    width?: string
    height?: string
    padding?: string
    margin?: string
}
