import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { DependencyList, useEffect } from 'react'

export const useFieldDefaultValue = (
    field?: IExtendedInput,
    action?: (value: any, ...args: any[]) => void,
    deps: DependencyList = [field?.input.defaultValue]
) => {
    useEffect(() => {
        if (field && 'defaultValue' in field.input) {
            field?.input?.valueManager?.setValue(field, field?.input.defaultValue)
        }
        action?.(field?.input.defaultValue, ...deps)
    }, deps)
}
