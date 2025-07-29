export interface IBaseTextProps extends Partial<React.ComponentClass<'label', 'span'>> {
    id: string
    text: string
    htmlFor?: string
    className?: string
}
