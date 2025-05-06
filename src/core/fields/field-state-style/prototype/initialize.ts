import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { IFieldStateStyle } from '../field-state-style.types'

export const initialize = function (this: IFieldStateStyle) {
    initializer(initialize.name, this, this.field, [], (e) => {
        if (!e.field.validationStrategy?.validationOptions) {
            throw Error(
                `${initialize.name}: unable to intialize Styles you must provide validationOptions before invoking this.`
            )
        }
        this.field?.notifier?.observers.subscribe(this.classNames.bind(this))
        this.field?.notifier?.observers.subscribe(this.getFlagsObject.bind(this))
    })
}
