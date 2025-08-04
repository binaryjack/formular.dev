export interface ICheckboxInput extends Omit<Partial<React.ComponentProps<'input'>>, 'type'> {
    id: string
    label?: string
    tabIndex?: number
    className?: string
    initialState?: boolean
    size: number
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
