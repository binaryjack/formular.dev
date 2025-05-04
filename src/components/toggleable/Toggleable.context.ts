import { ToggleableStateType } from '@core/fields/toggleable-base-element/toggleable-base-element'
import { createContext } from 'react'

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
