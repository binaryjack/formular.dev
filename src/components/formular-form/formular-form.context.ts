import { IFormular, IFormularFlags } from '@core/formular-engine/formular-base/formular-base.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import React from 'react'

export interface IFormularContext<T extends object> {
    getFields: () => IExtendedInput[]
    getFormFlags: () => IFormularFlags
    message: string[]
    formInstance: IFormular<T> | undefined
    getField: (fieldName: string) => IExtendedInput | undefined
}

export const formularCotextDefault = {
    getFields: () => [],
    getFormFlags: () => {
        return {} as IFormularFlags
    },
    getField: () => {
        return undefined
    },
    message: [],
    formInstance: undefined
}

export const formularContext = React.createContext<IFormularContext<any>>(formularCotextDefault)

export const useFormularContext = <T extends object>(): IFormularContext<T> => {
    return React.useContext(formularContext)
}
export default useFormularContext
