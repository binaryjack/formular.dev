import { getDayNames } from './getDayNames'

export const getDayIndexByName = (day: string): number => {
    return getDayNames().indexOf(day)
}
