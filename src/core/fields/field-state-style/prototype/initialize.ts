import { IFieldStateStyle } from '../field-state-style.types'

export const initialize = function (this: IFieldStateStyle) {
    if (!this.field.validationStrategy()?.validationOptions) {
        throw Error(
            `${initialize.name}: unable to intialize Styles you must provide validationOptions before invoking this.`
        )
    }

    this.field?.notifier()?.observers.subscribe(this.classNames.bind(this))
    this.field?.notifier()?.observers.subscribe(this.getFlagsObject.bind(this))

    /* sets the required flag indicator */
    this.fieldStateStyle.update(
        'required',
        this.field.validationStrategy()?.validationOptions.requiredData?.required === true
    )
}
