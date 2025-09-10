import type { ToggleableStateType } from 'formular.dev.lib'
import { CSSProperties } from 'react'

export interface IToggleableProviderProps {
    id: string
    children: React.ReactNode
    initialState?: ToggleableStateType
    style?: CSSProperties
    className?: string
}
