import { getDayNames } from './get-day-names'

export const getDayIndex = (day: string): number => {
    return getDayNames().indexOf(day)
}
