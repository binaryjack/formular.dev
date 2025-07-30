import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'
import { CSSProperties } from 'react'

export interface IToggleableProviderProps {
    id: string
    children: React.ReactNode
    initialState?: ToggleableStateType
    style: CSSProperties
}
