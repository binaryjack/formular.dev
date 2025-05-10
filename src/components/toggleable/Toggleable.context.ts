import { ToggleableStateType } from '@core/framework/common/common.toggleable'
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
