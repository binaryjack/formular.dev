import { AppBreakPointSizesType } from './types/app-break-point-sizes.type'

export const getSizeTypeName = (size: string): AppBreakPointSizesType =>
    size as AppBreakPointSizesType
