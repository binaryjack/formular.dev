import { defaultExtendsEventObject, IEvents } from 'formular.dev.lib'

export interface ISelection {
    text: string
    start: number
    end: number
    isCollapsed: boolean
}

export interface IFormatDefinition {
    tagName: string
    formatName: string
    active: boolean
}

export const newFormatDefinition = (tagName: string, formatName: string, active: boolean) => {
    return { tagName, formatName, active }
}

export enum TextEditEnum {
    insertText = 'insertText',
    deleteText = 'deleteText'
}

export enum FormatsEnum {
    bold = 'bold',
    italic = 'italic',
    underline = 'underline',
    strikethrough = 'strikethrough',
    unorderedList = 'unorderedList',
    link = 'link'
}

export enum TagEnum {
    bold = 'STRONG',
    italic = 'EM',
    underline = 'U',
    strikethrough = 'S',
    unorderedList = 'UL',
    link = 'A'
}

export type TagsType = keyof typeof TagEnum
export const TagsArray: string[] = Object.values(TagEnum)

export type FormatsType = keyof typeof FormatsEnum
export const FormatsArray: string[] = Object.values(FormatsEnum)

export const formatDefinitionMap: IFormatDefinition[] = [
    newFormatDefinition(TagEnum.bold, FormatsEnum.bold, false),
    newFormatDefinition(TagEnum.italic, FormatsEnum.italic, false),
    newFormatDefinition(TagEnum.underline, FormatsEnum.underline, false),
    newFormatDefinition(TagEnum.strikethrough, FormatsEnum.strikethrough, false),
    newFormatDefinition(TagEnum.unorderedList, FormatsEnum.unorderedList, false),
    newFormatDefinition(TagEnum.link, FormatsEnum.link, false)
]?.sort((a, b) => a?.tagName?.toString?.().localeCompare(b?.tagName))

// Map format types to tag names
export const tagMap: Record<string, string> = {
    bold: TagEnum.bold,
    italic: TagEnum.italic,
    underline: TagEnum.underline,
    strikethrough: TagEnum.strikethrough,
    unorderedList: TagEnum.unorderedList,
    link: TagEnum.link
}

export type RteCommandType =
    | FormatsEnum.bold
    | FormatsEnum.italic
    | FormatsEnum.underline
    | FormatsEnum.strikethrough
    | FormatsEnum.unorderedList
    | FormatsEnum.link
    | TextEditEnum.insertText
    | TextEditEnum.deleteText

export interface IRteCommand {
    type: RteCommandType
    payload?: any
    timestamp: number
}

export interface IEngineState extends IEvents {
    html: string
    text: string
    content: string
    selection: ISelection | null
    activeFormatState: IFormatDefinition[]
    historyLength: number
    canUndo: boolean
    canRedo: boolean
    mouseState: IMouseState
}

export const defaultEngineState: IEngineState = {
    html: '',
    text: '',
    content: '',
    selection: null,
    activeFormatState: formatDefinitionMap,
    historyLength: -1,
    canUndo: false,
    canRedo: false,
    mouseState: { down: false, move: false },
    ...defaultExtendsEventObject
}

export const trackFormatingByTagName = (
    current: IFormatDefinition[],
    tagName: string,
    value: boolean
): IFormatDefinition[] => {
    const currentDefinition = {
        ...current.find?.((o) => o.tagName === tagName),
        active: value
    } as IFormatDefinition
    return [...current.filter((o) => o.tagName !== tagName), currentDefinition]?.sort((a, b) =>
        a?.tagName?.toString?.().localeCompare(b?.tagName)
    )
}

export const newCommand = (type: RteCommandType): Omit<IRteCommand, 'timestamp'> => {
    return { type } as Omit<IRteCommand, 'timestamp'>
}

export interface IMouseState {
    move: boolean
    down: boolean
}

export interface IHistoryItem {
    commandType: RteCommandType
    timestamp: number
    previousState: string | null
    newState: string | null
}

export interface IStateData {
    data: string | null
    ts: string
}

export const newStateData = (data: string | null): IStateData => {
    return { data: data, ts: `${Math.random().toString(36).substring(2, 9)}` }
}

export interface ILinkData {
    node: HTMLAnchorElement
    url: string
    text: string
}
