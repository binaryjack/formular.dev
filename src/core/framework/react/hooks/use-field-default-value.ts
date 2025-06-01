import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { useEffect } from 'react'

export const useFieldDefaultValue = (field?: IExtendedInput, action?: (value: any) => void) => {
    useEffect(() => {
        const to = setTimeout(() => {
            if (!field?.input.defaultValue) return
            field?.input?.valueManager?.setValue(field, field?.input.defaultValue)
            action?.(field?.input.defaultValue)
            clearTimeout(to)
        }, 0)
    }, [field?.input.defaultValue])
}
