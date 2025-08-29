import { ITypographyConfig } from '@/types/interfaces/i-typography-config'
import { caseResolver } from './case-resolver'
import { textSizeResolver } from './text-size-resolver'
import { weightResolver } from './weight-resolver'

export const typographyResolver = (typography?: ITypographyConfig) => {
    if (!typography) return ''

    const textSize = typography ? textSizeResolver('text', typography.size ?? 'md') : 'text-md'
    const textCase = typography
        ? caseResolver('text', typography.case ?? 'normal-case')
        : 'normal-case'
    const textWeight = typography
        ? weightResolver('text', typography.weight ?? 'normal')
        : 'font-normal'

    const outputArray = [textSize, textCase, textWeight]

    return outputArray.filter(o => !!o).join(' ')
}
