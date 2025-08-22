import type { IHeaderStyle } from '../../../interfaces/i-header-style'

/**
 * Get dark impact header style configuration
 */
export const getDarkImpactStyle = function (this: any): IHeaderStyle {
    return {
        disableGenericText: true,
        forceBackgroundClasses: ['bg-slate-800', 'dark:bg-slate-900'],
        forceTextClasses: ['text-white', 'dark:text-slate-100'],
        customClasses: ['border-b', 'border-slate-700']
    }
}
