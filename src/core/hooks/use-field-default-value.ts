import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { useEffect } from 'react'

export const useFieldDefaultValue = (field?: IFieldInput, action?: (value: any) => void) => {
    useEffect(() => {
        const to = setTimeout(() => {
            if (!field?.defaultValue) return
            field?.setValue(field?.defaultValue)
            action?.(field?.defaultValue)
            clearTimeout(to)
        }, 0)
    }, [field?.defaultValue])
}
