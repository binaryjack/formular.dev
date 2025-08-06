import { IGenericComponentVariants } from 'formular.design.system'

export interface IBaseInputProps extends Omit<Partial<React.ComponentProps<'input'>>, 'type'> {
    dataClass?: string
    changeDelay?: number
    placeHolder?: string
    tabIndex?: number
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeCallback?: (value: string) => void
    variants?: Partial<IGenericComponentVariants>
}
