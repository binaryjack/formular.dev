import { IFlexLayoutBreakPoints } from './flex-layout.types'

export const generateStyle = (rules?: IFlexLayoutBreakPoints) => {
    if (!rules) return undefined
    const output = Object.values(rules)
        .filter((o) => o !== undefined || o !== '')
        .map((o) => `${o}`)
        .join(' ')

    return output
}
