import { IFieldStateStyle } from '../field-state-style.types'

export const initialize = function (this: IFieldStateStyle) {
    this.field._notifier?.observers.subscribe(this.classNames.bind(this))
    this.field._notifier?.observers.subscribe(this.getFlagsObject.bind(this))

    /* sets the required flag indicator */
    this.fieldStateStyle.update(
        'required',
        this.field.validationOptions.requiredData?.required === true
    )
}
