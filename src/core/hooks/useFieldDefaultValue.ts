import { useEffect } from 'react'
import { IFieldInput } from '../base/fieldInputBase/fieldInput.types'

export const useFieldDefaultValue = (field?: IFieldInput, action?: (value: any) => void) => {
    useEffect(() => {
        if (!field?.defaultValue) return
        field?.setValue(field?.defaultValue)
        action?.(field?.defaultValue)
    }, [field?.defaultValue])
}
