import { IFormy, IFormyFlags } from '@core/formy-base/formy-base.types'
import { FormCreator } from '@core/formy-base/formy.creator'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import React from 'react'

export interface IFormyContext {
    getFields: () => IInput[]
    getFormFlags: () => IFormyFlags
    formInstance: IFormy | undefined
    getField: (fieldName: string) => IInput | undefined
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
