import { createContext } from 'react'
import { ToggleableStateType } from '../../core/base/toggleable-base-element/toggleable-base-element'

export interface IToggleableContextType {
    toggleState: ToggleableStateType
    setToggleState: (state: ToggleableStateType) => void
}
export const toggleableContextTypeDefault: IToggleableContextType = {
    toggleState: 'idle',
    setToggleState: () => {
        return
    }
}
export const toggleableContext = createContext<IToggleableContextType>(toggleableContextTypeDefault)
