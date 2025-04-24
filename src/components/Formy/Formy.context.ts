import React from 'react'

import { IFieldInput } from '../../core/base/field-input-base/field-input.types'
import { IFormy, IFormyFlags } from '../../core/base/formy-base/formy-base.types'
import { FormCreator } from '../../core/base/formy-base/formy.creator'

export interface IFormyContext {
    getFields: () => IFieldInput[]
    getFormFlags: () => IFormyFlags
    formInstance: IFormy | undefined
    getField: (fieldName: string) => IFieldInput | undefined
}

export const formyCotextDefault = {
    getFields: () => [],
    getFormFlags: () => {
        return {} as IFormyFlags
    },
    getField: () => {
        return undefined
    },
    formInstance: undefined
}

export const { getFieldHook, newFormy, useForm } = FormCreator
export const useField = getFieldHook()

export const formyContext = React.createContext<IFormyContext>(formyCotextDefault)

export const useFormyContext = (): IFormyContext => {
    return React.useContext(formyContext)
}
export default useFormyContext
