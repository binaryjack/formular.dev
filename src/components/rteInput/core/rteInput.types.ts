export interface ISelection {
    text: string
    start: number
    end: number
    isCollapsed: boolean
}

export type RteCommandType =
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'insertText'
    | 'deleteText'

export interface IRteCommand {
    type: RteCommandType
    payload?: any
    timestamp: number
}

export interface IEditorState {
    html: string
    text: string
    content: string
    selection: ISelection | null
    historyLength: number
    canUndo: boolean
    canRedo: boolean
}
