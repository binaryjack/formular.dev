import type { ComponentSizeType } from '../../../types'

/**
 * Component visual aspect configuration
 */
export interface IComponentAspect {
    size?: ComponentSizeType
    borders?: boolean
    rounded?: boolean
    width?: string
    height?: string
}
