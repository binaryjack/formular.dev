import { useContext } from 'react'
import {
    getToggleableContext,
    IToggleableContextType,
    toggleableContextTypeDefault
} from './toggleable.context'

export const useToggleableContext = (id?: string): IToggleableContextType => {
    const toggleableContext = getToggleableContext(id)
    const context = useContext(toggleableContext)
    if (!context) {
        console.warn('useCollapsible must be used within a CollapsibleProvider')
        return toggleableContextTypeDefault
    }
    return context
}
