import { ISmartLayoutBreakPoints } from './smart-layout.types'

export const generateStyle = (rules?: ISmartLayoutBreakPoints) => {
    if (!rules) return undefined
    const output = Object.values(rules)
        .filter((o) => o !== undefined || o !== '')
        .map((o) => `${o}`)
        .join(' ')

    return output
}
