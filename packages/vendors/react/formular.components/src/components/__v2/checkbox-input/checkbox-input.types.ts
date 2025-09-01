import { IComponentStyleConfig } from 'formular.design.system'
import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'

export interface ICheckboxInput extends Omit<Partial<React.ComponentProps<'input'>>, 'type'> {
    option: IOptionItem
    tabIndex?: number
    className?: string
    initialState?: boolean
    size: number
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    variants?: Partial<IComponentStyleConfig>
}
