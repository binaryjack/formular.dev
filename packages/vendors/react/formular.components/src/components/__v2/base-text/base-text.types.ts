export interface IBaseTextProps extends Partial<React.ComponentProps<'label'>> {
    text: string
    htmlFor?: string
    className?: string
}
