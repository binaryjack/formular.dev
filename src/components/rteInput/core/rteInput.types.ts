import { INotifiableEntity } from '../../../core/notifiableEntity/notifiableEntityBase.types'
import { IRteEngineBase } from './rteEngine/rteEngine.types'

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
    strikethrough = 'strikethrough'
}

export enum TagEnum {
    bold = 'STRONG',
    italic = 'EM',
    underline = 'U',
    strikethrough = 'S'
}

export type TagsType = keyof typeof TagEnum
export const TagsArray: string[] = Object.values(TagEnum)

export type FormatsType = keyof typeof FormatsEnum
export const FormatsArray: string[] = Object.values(FormatsEnum)

export const formatDefinitionMap: IFormatDefinition[] = [
    newFormatDefinition(TagEnum.bold, FormatsEnum.bold, false),
    newFormatDefinition(TagEnum.italic, FormatsEnum.italic, false),
    newFormatDefinition(TagEnum.underline, FormatsEnum.underline, false),
    newFormatDefinition(TagEnum.strikethrough, FormatsEnum.strikethrough, false)
]?.sort((a, b) => a?.tagName?.toString?.().localeCompare(b?.tagName))

// Map format types to tag names
export const tagMap: Record<string, string> = {
    bold: TagEnum.bold,
    italic: TagEnum.italic,
    underline: TagEnum.underline,
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

export interface IEngineState {
    mouseState: IMouseState
}

export interface IEditorState {
    html: string
    text: string
    content: string
    selection: ISelection | null
    activeFormatState: IFormatDefinition[]
    historyLength: number
    canUndo: boolean
    canRedo: boolean
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
