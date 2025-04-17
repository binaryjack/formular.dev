import { FormatsEnum, IFormatDefinition } from '../rteInput.types'

export const isFormatActive = (
    activeFormatState: IFormatDefinition[] | undefined,
    expectedFormat: FormatsEnum
) => activeFormatState?.find?.((o) => o.formatName === expectedFormat)?.active ?? false
