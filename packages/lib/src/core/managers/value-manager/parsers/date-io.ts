import {
    isNDate,
    isNullEmptyOrUndefined,
    tryConvertINDateToDateObject,
    tryConvertStringToDateObject
} from '@core/framework'
import { INDate } from '@core/framework/schema'
import { DateObject } from '@core/framework/types/date/date-object.object'
import { IDateObject } from '@core/framework/types/date/i-date-object'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { logManager } from '@core/managers/log-manager'

import { TGetter, TSetter } from '../value-manager.types'

export const dateGetter: TGetter<string | null> = (extInput: IExtendedInput): string | null => {
    if (!isNullEmptyOrUndefined(extInput.input.objectValue)) {
        if (isNDate(extInput.input.objectValue)) {
            const value = tryConvertINDateToDateObject(extInput.input.objectValue)

            if (value instanceof DateObject) {
                return value.toString?.(extInput.input.culture.dateFormat) ?? null
            }
        }
    }
    return extInput.input.value as string | null
}

/**
 * Helper function to check if a date string is valid before attempting conversion
 */
const isValidDateString = (dateString: string, format: string): boolean => {
    // Basic check - ensure we have enough characters and no obvious invalid dates
    if (dateString.length !== 10) return false

    // Extract parts based on common date patterns
    const parts = dateString.split(/[/\-.]/)
    if (parts.length !== 3) return false

    const [part1, part2, part3] = parts

    // Basic range checks (doesn't need to be perfect, just prevent obvious errors)
    const num1 = parseInt(part1, 10)
    const num2 = parseInt(part2, 10)
    const num3 = parseInt(part3, 10)

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) return false

    // Check for reasonable ranges (day: 1-31, month: 1-12, year: 1900-2100)
    // This is a basic check, actual validation will happen in conversion
    if (format.toLowerCase().includes('dd')) {
        // DD/MM/YYYY or DD-MM-YYYY
        return num1 >= 1 && num1 <= 31 && num2 >= 1 && num2 <= 12 && num3 >= 1900 && num3 <= 2100
    } else if (format.toLowerCase().includes('mm')) {
        // MM/DD/YYYY or MM-DD-YYYY
        return num1 >= 1 && num1 <= 12 && num2 >= 1 && num2 <= 31 && num3 >= 1900 && num3 <= 2100
    }

    return true // Default to allowing conversion attempt
}

export const dateSetter: TSetter<Date | IDateObject | INDate | string | null> = function (
    extInput: IExtendedInput,
    value: any
) {
    console.log('🗓️ dateSetter called', {
        fieldName: extInput.input.name,
        value,
        valueType: typeof value,
        valueLength: typeof value === 'string' ? value.length : 'N/A',
        dependencyName: extInput.dependencyName
    })

    try {
        // For masked date inputs, we need to be more careful about when to attempt conversion
        // Only try to convert if we have a complete date string and it's not from a masked input in progress
        if (typeof value === 'string' && value.length === 10) {
            // Check if this is a masked input by looking for a mask property
            const isMaskedInput =
                extInput.dependencyName === 'MaskedBaseInput' ||
                (extInput as any).mask != null ||
                (extInput.input as any).mask != null ||
                extInput.input.type === 'date'

            console.log('🎭 Masked input check', {
                isMaskedInput,
                dependencyName: extInput.dependencyName
            })

            // For masked inputs, only convert if we have a complete valid-looking date
            if (!isMaskedInput || isValidDateString(value, extInput.input.culture.dateFormat)) {
                console.log('✅ Attempting date conversion for:', value)
                value = tryConvertStringToDateObject(value, extInput.input.culture.dateFormat)
            } else {
                console.log('⏸️ Skipping conversion for masked input:', value)
            }
        }
        if (isNDate(value)) {
            value = tryConvertINDateToDateObject(value)
        }

        if (value instanceof DateObject) {
            const dateString = value.toString?.(extInput.input.culture.dateFormat) ?? null
            console.log('📅 Setting DateObject value:', { dateString })

            extInput.input.domManager.dmSetValue(extInput.input.id.toString(), dateString)
            extInput.input.value = dateString
            extInput.input.objectValue = value?.toINDate?.() ?? null
        } else {
            console.log('📝 Setting string value:', value)
            extInput.input.domManager.dmSetValue(extInput.input.id.toString(), value)
            extInput.input.value = value
            /** keep this object value to null until we have a correct date */
            extInput.input.objectValue = null
        }
    } catch (e: any) {
        console.error('❌ dateSetter error:', {
            error: e.message,
            value,
            fieldName: extInput.input.name
        })
        logManager(
            undefined,
            'error',
            `Error setting date value for field ${extInput.input.name}: ${e.message}`,
            'dateSetter'
        )
        // For masked inputs during typing, don't reset to null - preserve the partial input
        const isMaskedInput =
            extInput.dependencyName === 'MaskedBaseInput' ||
            (extInput as any).mask != null ||
            (extInput.input as any).mask != null ||
            extInput.input.type === 'date'

        if (isMaskedInput && typeof value === 'string' && value.length < 10) {
            console.log('🛡️ Preserving partial input for masked date:', value)
            // Keep the partial input for masked date inputs
            extInput.input.domManager.dmSetValue(extInput.input.id.toString(), value)
            extInput.input.value = value
            extInput.input.objectValue = null
        } else {
            console.log('🚫 Resetting to null due to error')
            extInput.input.value = null
            extInput.input.objectValue = null
        }
    }
}
