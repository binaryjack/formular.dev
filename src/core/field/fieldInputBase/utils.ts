import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { DateObject } from '../../../dependency/schema/descriptor/field.data.dateobject.type'

export const toPascal = (word: string) => {
    return word.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase()
    })
}

export const capitalizeFirstLetter = (word: string) => {
    return word.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1)
    })
}

export const isNullOrEmpty = (value: string | null) => value === null || value === ''

export const isNullEmptyOrUndefined = (value?: string | null) =>
    value === null || value === '' || value === undefined

export const isNumericNullOrUndefined = (value?: number | null) =>
    value === null || value === undefined

export const isBooleanNullOrUndefined = (value?: boolean | null) =>
    value === null || value === undefined

export const isBigIntNullOrUndefined = (value?: bigint | null) =>
    value === null || value === undefined

export const isNDateNullOrUndefined = (value?: INDate | DateObject | null) =>
    value === null || value === undefined
