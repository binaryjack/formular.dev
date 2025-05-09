import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { logManager } from '@core/general-logging-manager/log-manager'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { CheckBoxInput } from '../check-box-base-input'
import { ICheckBoxBaseInput } from '../check-box-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: ICheckBoxBaseInput,
    params: IFieldInitializationParameters
) {
    try {
        const success = await abstractInitializer(
            this.field,
            (e) => {
                logManager(undefined, 'info', 'initialize', e.name)
                this.checked = undefined
            },
            [
                nnv(
                    newEvent(
                        this.field.name,
                        initialize.name,
                        'onChange',
                        this.handleOnChanged.name
                    ),
                    this.handleOnChanged.bind(this)
                )
            ]
        )

        if (success) {
            logManager(this.field.tracker, 'info', this.dependencyName, 'Initialized')
            // Object.setPrototypeOf(CheckBoxInput.prototype, FieldInput.prototype)
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.field.tracker, 'critical', this.dependencyName, e)
    }
}
