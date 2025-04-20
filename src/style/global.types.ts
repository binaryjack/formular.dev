export interface IColorCorrespondance {
    // background: string
    bg: string
    // foreground: string
    fg: string
}

export enum VariantNameEnum {
    primary = 'primary',
    secondary = 'secondary',
    info = 'info',
    danger = 'danger',
    success = 'success',
    warning = 'warning'
}

export type VariantNameType = keyof typeof VariantNameEnum
export const VariantNameArray: string[] = Object.values(VariantNameEnum)

/**https://htmlcolorcodes.com/color-names/ */
export const colorsCorrecpondance: Record<string, IColorCorrespondance> = {
    primary: { bg: 'lightblue', fg: 'white' },
    secondary: { bg: 'darkgray', fg: 'lightgray' },
    danger: { bg: 'lightyellow', fg: 'lightred' },
    success: { bg: 'darkGreen', fg: 'SpringGreen' },
    warning: { bg: 'lightyellow', fg: 'Yellow' },
    info: { bg: 'violet', fg: 'lightPink' }
}

export type orientationTypes = 'vertical' | 'horizontal'

export const getCorrespondingVariantColors = (variant: VariantNameType) =>
    colorsCorrecpondance[variant]

export const getVariantTypeName = (variant: string): VariantNameType => variant as VariantNameType

export type TextCaseType = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'

export enum TextWeightEnum {
    extralight = 'extralight',
    light = 'light',
    thin = 'thin',
    normal = 'normal',
    medium = 'medium',
    semibold = 'semibold',
    bold = 'bold',
    extrabold = 'extrabold',
    mono = 'mono',
    sans = 'sans',
    serif = 'serif'
}

export type TextWeightType = keyof typeof TextWeightEnum
export const TextWeightArray: string[] = Object.values(TextWeightEnum)

export const getWeightTypeName = (weight: string): TextWeightType =>
    Object.keys(TextWeightArray).find((o) => o === weight) as TextWeightType

export enum ScreenOrientationEnum {
    portrait = 'portrait',
    landscape = 'landscape',
    undefined = 'undefined'
}

export type ScreenOrientationType = keyof typeof ScreenOrientationEnum
export const ScreenOrientationArray: string[] = Object.values(ScreenOrientationEnum)

export const getScreenOrientationTypeName = (orientation: string): ScreenOrientationType =>
    orientation as ScreenOrientationType

// xxs: '0px',
// xs: '0px'
// sm: '640px',
// // => @media (min-width: 640px) { ... }
// md: '768px',
// // => @media (min-width: 768px) { ... }
// lg: '1024px',
// // => @media (min-width: 1024px) { ... }
// xl: '1280px',
// // => @media (min-width: 1280px) { ... }
// xxl: '1536px'
// // => @media (min-width: 1536px) { ... }

export enum AppBreakPointSizesEnum {
    '2xs' = '2xs',
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
    '2xl' = '2xl'
}

export type AppBreakPointSizesType = keyof typeof AppBreakPointSizesEnum
export const DrawerBreakPointType: string[] = [
    AppBreakPointSizesEnum.md,
    AppBreakPointSizesEnum.lg,
    AppBreakPointSizesEnum.xl,
    AppBreakPointSizesEnum['2xl']
]
export const AppBreakPointSizesArray: string[] = Object.values<string>(
    AppBreakPointSizesEnum
) as string[]

export const getSizeTypeName = (size: string): AppBreakPointSizesType =>
    size as AppBreakPointSizesType

export type ElementPositionOutputType = 'top' | 'bottom' | 'center'
