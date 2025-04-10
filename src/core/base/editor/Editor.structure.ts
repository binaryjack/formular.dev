/**
 * selection and range text target for any format
 */
export interface IRange {
    start: number
    end: number
}

/**
 * Formatting type Bold Italic, underline
 *
 *
 */
export interface IFormat {
    name: string
    tag: string
    description: string
}

export interface IPosition {
    carriageReturn: number
    indentation: number
}

/**
 * Represents a range with specific formatting to be applied
 */
export interface IFormatBlock {
    format: IFormat
    ranges: IRange[]
}

export type TextBlockType = 'Paragraph' | 'list'

export interface ITextBlock {
    range: IRange
    type: TextBlockType
    formats: IFormatBlock[]
    position: IPosition
}

export interface IStructure {
    name: string
    text: string
}
