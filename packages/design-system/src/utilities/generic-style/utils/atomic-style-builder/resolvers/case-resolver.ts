import type { TextCaseType } from '../../../../../types/types'

export const caseResolver = (prefix: string, textCase: TextCaseType) => {
    // Convert the text case type to the appropriate Tailwind class
    const caseMap: Record<TextCaseType, string> = {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
        'normal-case': 'normal-case'
    }

    return caseMap[textCase] || 'normal-case'
}
