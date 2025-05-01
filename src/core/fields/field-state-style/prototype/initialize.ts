import { IFieldStateStyle } from '../field-state-style.types'

export const initialize = function (this: IFieldStateStyle) {
    if (!this.field.validationOptions) {
        throw Error(
            `${initialize.name}: unable to intialize Styles you must provide validationOptions before invoking this.`
        )
    }

    this.field?.observers.subscribe(this.classNames.bind(this))
    this.field?.observers.subscribe(this.getFlagsObject.bind(this))

    /* sets the required flag indicator */
    this.fieldStateStyle.update(
        'required',
        this.field.validationOptions.requiredData?.required === true
    )
}
