import type { IHeaderStyle } from '../../../interfaces/i-header-style'

/**
 * Get subtle header style configuration
 */
export const getSubtleStyle = function (this: any): IHeaderStyle {
    return {
        disableGenericText: false,
        forceBackgroundClasses: [],
        forceTextClasses: [],
        customClasses: ['bg-opacity-50', 'backdrop-blur-sm']
    }
}
