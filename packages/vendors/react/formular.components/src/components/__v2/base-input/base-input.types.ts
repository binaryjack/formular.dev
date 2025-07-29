export interface IBaseInputProps extends Omit<Partial<React.ComponentClass<'input'>>, 'type'> {
    id: string
    dataClass?: string
    placeHolder?: string
    tabIndex?: number
    className?: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
