export interface ILabelProps extends React.ComponentProps<'label'> {
    htmlFor: string
    text: string
    classNames?: string
    size?: number
}
