import { IColorCorrespondance } from './interfaces/i-color-correspondance'

/**https://htmlcolorcodes.com/color-names/ */
export const colorsCorrecpondance: Record<string, IColorCorrespondance> = {
    primary: { bg: 'lightblue', fg: 'white' },
    secondary: { bg: 'darkgray', fg: 'lightgray' },
    danger: { bg: 'lightyellow', fg: 'lightred' },
    success: { bg: 'darkGreen', fg: 'SpringGreen' },
    warning: { bg: 'lightyellow', fg: 'Yellow' },
    info: { bg: 'violet', fg: 'lightPink' }
}
