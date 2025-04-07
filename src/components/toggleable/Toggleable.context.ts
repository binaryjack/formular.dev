import { createContext } from 'react'
import { ToggleableStateType } from './Toggleable.types'

export interface IToggleableContextType {
    toggleState: ToggleableStateType
    setToggleState: (state: ToggleableStateType) => void
}
export const toggleableContextTypeDefault: IToggleableContextType = {
    toggleState: 'closed',
    setToggleState: () => {
        return
    }
}
export const toggleableContext = createContext<IToggleableContextType>(toggleableContextTypeDefault)
