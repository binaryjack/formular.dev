import type { IHeaderStyle } from '../../../interfaces/i-header-style'

/**
 * Get default header style configuration
 */
export const getDefaultHeaderStyle = function (this: any): IHeaderStyle {
    return {
        disableGenericText: false,
        forceBackgroundClasses: [],
        forceTextClasses: [],
        customClasses: []
    }
}
