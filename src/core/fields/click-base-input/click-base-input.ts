import { preExceptionHandler } from '@core/tracker/pre-exception-handler/pre-exception-handler'
import { IClickInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { initialize } from './prototype/initialize'

export const ClickBaseInput = function (this: IClickInput) {
    this.field = function (this: IClickInput) {
        if (!this._field) {
            preExceptionHandler(
                undefined,
                'critical',
                this.name,
                `Unable to instanciate ${this.name} no fieldInput was provided!`
            )
        }
        return this._field
    }
} as any as IClickInput

Object.assign(ClickBaseInput.prototype, {
    handleOnClicked,
    initialize
})
