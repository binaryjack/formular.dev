import { INotifiableEntity } from '../../../notifiable-entity/notifiable-entity-base.types'
import { IFieldInput } from '../field-input.types'

const defaultFieldInputCSSClassName = 'f-input'

export const initializeAutoTracker = function (this: IFieldInput, autoTracker?: INotifiableEntity) {
    this.autoTracker = autoTracker
}
