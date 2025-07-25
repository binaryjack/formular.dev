/**
 * Style Config Interface
 *
 * Interface for component style configuration.
 */

import type { ComponentSizeType } from '../types/component-size.type'
import type { ComponentVariantType } from '../types/component-variant.type'
import type { IComponentState } from './i-component-state'

export interface IStyleConfig {
    /** Base CSS classes */
    base?: string
    /** Variant-specific classes */
    variants?: Record<string, string>
    /** Size-specific classes */
    sizes?: Record<ComponentSizeType, string>
    /** Color-specific classes */
    colors?: Record<ComponentVariantType, string>
    /** State-specific classes */
    states?: Partial<Record<keyof IComponentState, string>>
}
