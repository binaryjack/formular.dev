import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { IFieldStateStyle } from '../field-state-style.types'

export const initialize = function (this: IFieldStateStyle) {
    initializer(initialize.name, this.field, [], (e) => {
        if (!e.validationStrategy?.validationOptions) {
            throw Error(
                `${initialize.name}: unable to intialize Styles you must provide validationOptions before invoking this.`
            )
        }
        e?.notifier?.observers.subscribe(this.classNames.bind(this))
        e?.notifier?.observers.subscribe(this.getFlagsObject.bind(this))
    })
}
