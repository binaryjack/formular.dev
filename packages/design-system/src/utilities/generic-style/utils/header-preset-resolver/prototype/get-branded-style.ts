import type { ComponentVariantType } from '../../../../../types'
import { COMPONENT_STYLE_CONFIG } from '../../../config/component-style-config'
import type { IHeaderStyle } from '../../../interfaces/i-header-style'
import type { ComponentType } from '../../../types/component-type.type'

/**
 * Get branded header style configuration
 */
export const getBrandedStyle = function (
    this: any,
    componentType: ComponentType,
    variant?: ComponentVariantType
): IHeaderStyle {
    const effectiveVariant =
        variant || COMPONENT_STYLE_CONFIG[componentType]?.defaultVariant || 'primary'

    return {
        disableGenericText: true,
        forceBackgroundClasses: [
            `${componentType}-header`,
            `${componentType}-header-${effectiveVariant}`
        ],
        forceTextClasses: [],
        customClasses: []
    }
}
