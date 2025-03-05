import React from 'react'

import { IFieldInput } from '../../core/base/fieldInputBase/fieldInput.types'
import { FormCreator } from '../../core/base/formyBase/Formy.creator'
import { IFormy, IFormyFlags } from '../../core/base/formyBase/formyBase.types'

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

const useFormyContext = (): IFormyContext => {
    return React.useContext(formyContext)
}
export default useFormyContext
