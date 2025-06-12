import { IEvents } from '../../../core/framework/events/events.types';
export interface ISelection {
    text: string;
    start: number;
    end: number;
    isCollapsed: boolean;
}
export interface IFormatDefinition {
    tagName: string;
    formatName: string;
    active: boolean;
}
export declare const newFormatDefinition: (tagName: string, formatName: string, active: boolean) => {
    tagName: string;
    formatName: string;
    active: boolean;
};
export declare enum TextEditEnum {
    insertText = "insertText",
    deleteText = "deleteText"
}
export declare enum FormatsEnum {
    bold = "bold",
    italic = "italic",
    underline = "underline",
    strikethrough = "strikethrough",
    unorderedList = "unorderedList",
    link = "link"
}
export declare enum TagEnum {
    bold = "STRONG",
    italic = "EM",
    underline = "U",
    strikethrough = "S",
    unorderedList = "UL",
    link = "A"
}
export type TagsType = keyof typeof TagEnum;
export declare const TagsArray: string[];
export type FormatsType = keyof typeof FormatsEnum;
export declare const FormatsArray: string[];
export declare const formatDefinitionMap: IFormatDefinition[];
export declare const tagMap: Record<string, string>;
export type RteCommandType = FormatsEnum.bold | FormatsEnum.italic | FormatsEnum.underline | FormatsEnum.strikethrough | FormatsEnum.unorderedList | FormatsEnum.link | TextEditEnum.insertText | TextEditEnum.deleteText;
export interface IRteCommand {
    type: RteCommandType;
    payload?: any;
    timestamp: number;
}
export interface IEngineState extends IEvents {
    html: string;
    text: string;
    content: string;
    selection: ISelection | null;
    activeFormatState: IFormatDefinition[];
    historyLength: number;
    canUndo: boolean;
    canRedo: boolean;
    mouseState: IMouseState;
}
export declare const defaultEngineState: IEngineState;
export declare const trackFormatingByTagName: (current: IFormatDefinition[], tagName: string, value: boolean) => IFormatDefinition[];
export declare const newCommand: (type: RteCommandType) => Omit<IRteCommand, "timestamp">;
export interface IMouseState {
    move: boolean;
    down: boolean;
}
export interface IHistoryItem {
    commandType: RteCommandType;
    timestamp: number;
    previousState: string | null;
    newState: string | null;
}
export interface IStateData {
    data: string | null;
    ts: string;
}
export declare const newStateData: (data: string | null) => IStateData;
export interface ILinkData {
    node: HTMLAnchorElement;
    url: string;
    text: string;
}
