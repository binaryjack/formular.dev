export interface ISelection {
    text: string
    start: number
    end: number
    isCollapsed: boolean
}

export enum TextEditEnum {
    insertText = 'insertText',
    deleteText = 'deleteText'
}

export enum FormatsEnum {
    bold = 'bold',
    italic = 'italic',
    underline = 'underline',
    strikethrough = 'strikethrough'
}

export enum TagEnum {
    bold = 'STRONG',
    italic = 'EM',
    undeline = 'U',
    strikethrough = 'S'
}

// Map format types to tag names
export const tagMap: Record<string, string> = {
    bold: TagEnum.bold,
    italic: TagEnum.italic,
    underline: TagEnum.undeline,
    strikethrough: TagEnum.strikethrough
}

export type RteCommandType =
    | FormatsEnum.bold
    | FormatsEnum.italic
    | FormatsEnum.underline
    | FormatsEnum.strikethrough
    | TextEditEnum.insertText
    | TextEditEnum.deleteText

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
    activeFormatState: IActiveFormatsState
    historyLength: number
    canUndo: boolean
    canRedo: boolean
}

export interface IActiveFormatsState {
    bold: boolean
    italic: boolean
    underline: boolean
    strikethrough: boolean
}

export const activeFormatDefault: IActiveFormatsState = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
}

export const trackFormating = (
    current: IActiveFormatsState,
    commandName: RteCommandType,
    value: boolean
): IActiveFormatsState => {
    return { ...current, [commandName]: value }
}

export const newCommand = (type: RteCommandType): Omit<IRteCommand, 'timestamp'> => {
    return { type } as Omit<IRteCommand, 'timestamp'>
}
