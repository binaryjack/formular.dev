import { IGenericComponentVariants } from 'formular.design.system'

export interface IRadioOptionProps extends Omit<Partial<React.ComponentProps<'input'>>, 'type'> {
    id: string
    ['data-sequence-id']: number
    placeHolder?: string
    tabIndex?: number
    initialState?: boolean

    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    variants?: Partial<IGenericComponentVariants>
}
