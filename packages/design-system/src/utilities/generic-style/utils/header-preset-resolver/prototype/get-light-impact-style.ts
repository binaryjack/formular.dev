import type { IHeaderStyle } from '../../../interfaces/i-header-style'

/**
 * Get light impact header style configuration
 */
export const getLightImpactStyle = function (this: any): IHeaderStyle {
    return {
        disableGenericText: true,
        forceBackgroundClasses: ['bg-white', 'dark:bg-slate-100'],
        forceTextClasses: ['text-slate-900', 'dark:text-slate-800'],
        customClasses: ['border-b', 'border-slate-200']
    }
}
