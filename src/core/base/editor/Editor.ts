export interface IEditorOptions {}

export interface IEditor {
    new (options: IEditorOptions): IEditor
    name: string
    content: any
    selection: any
    hystory: any[]

    formatText: (range: any, format: any, value: any) => void
    insertText: (index: number, text: string) => void
    deleteText: (range: any) => void
}
