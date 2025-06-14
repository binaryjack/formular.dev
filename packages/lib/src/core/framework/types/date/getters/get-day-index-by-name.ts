import { getDayNames } from './get-day-names'

export const getDayIndexByName = (day: string): number => {
    return getDayNames().indexOf(day)
}
