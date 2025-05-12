import { IFormular, IFormularFlags } from '@core/formular-base/formular-base.types'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import React from 'react'

export interface IFormularContext {
    getFields: () => IInput[]
    getFormFlags: () => IFormularFlags
    formInstance: IFormular | undefined
    getField: (fieldName: string) => IInput | undefined
}

export const formularCotextDefault = {
    getFields: () => [],
    getFormFlags: () => {
        return {} as IFormularFlags
    },
    getField: () => {
        return undefined
    },
    formInstance: undefined
}

export const formularContext = React.createContext<IFormularContext>(formularCotextDefault)

export const useFormularContext = (): IFormularContext => {
    return React.useContext(formularContext)
}
export default useFormularContext
