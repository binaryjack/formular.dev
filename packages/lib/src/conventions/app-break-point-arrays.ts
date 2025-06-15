import { AppBreakPointSizesEnum } from './enums/app-break-point-sizes.enum'

export const DrawerBreakPointType: string[] = [
    AppBreakPointSizesEnum.md,
    AppBreakPointSizesEnum.lg,
    AppBreakPointSizesEnum.xl,
    AppBreakPointSizesEnum['2xl']
]

export const AppBreakPointSizesArray: string[] = Object.values<string>(
    AppBreakPointSizesEnum
) as string[]
