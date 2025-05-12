import { IInput } from '@core/field-engine/core/input-base/input-base.types'
import { useEffect } from 'react'

export const useFieldDefaultValue = (field?: IInput, action?: (value: any) => void) => {
    useEffect(() => {
        const to = setTimeout(() => {
            if (!field?.defaultValue) return
            field?.setValue(field?.defaultValue)
            action?.(field?.defaultValue)
            clearTimeout(to)
        }, 0)
    }, [field?.defaultValue])
}
