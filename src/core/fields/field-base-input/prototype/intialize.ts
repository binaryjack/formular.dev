import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { logManager } from '@core/general-logging-manager/log-manager'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { abstractInitializer } from '../abstract/abstract-initializer'
import { IFieldBaseInput } from '../field-input-base-types'

export const initialize = function (
    this: IFieldBaseInput,
    params: IFieldInitializationParameters
): void {
    abstractInitializer(
        initialize.name,
        this,
        (e) => {
            logManager(undefined, 'info', 'initialize', e.name)
        },
        [
            nnv(
                newEvent(
                    this.name,
                    this.handleValidation.name,
                    'onValidate',
                    this.handleValidation.name
                ),
                this.handleValidation.bind(this)
            ),
            nnv(
                newEvent(this.name, this.handleOnBlur.name, 'onBlur', this.handleOnBlur.name),
                this.handleOnBlur.bind(this)
            ),
            nnv(
                newEvent(this.name, this.handleOnFocus.name, 'onFocus', this.handleOnFocus.name),
                this.handleOnFocus.bind(this)
            )
        ]
    )
}
