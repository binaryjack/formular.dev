import { getDayNames } from './getDayNames'

export const getDayIndex = (day: string): number => {
    return getDayNames().indexOf(day)
}
