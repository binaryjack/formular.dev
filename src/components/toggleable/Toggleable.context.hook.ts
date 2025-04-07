import { useContext } from 'react'
import {
    IToggleableContextType,
    toggleableContext,
    toggleableContextTypeDefault
} from './Toggleable.context'

export const useToggleableContext = (): IToggleableContextType => {
    const context = useContext(toggleableContext)
    if (!context) {
        console.warn('useCollapsible must be used within a CollapsibleProvider')
        return toggleableContextTypeDefault
    }
    return context
}
