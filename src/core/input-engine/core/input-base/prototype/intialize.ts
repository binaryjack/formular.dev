import { ExceptionManager } from '@core/framework/exceptions/exception-manager'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { logManager } from '@core/managers/log-manager/log-manager'
import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { abstractInitializer } from '../../abstract/abstract-initializer'
import { IInputBase } from '../input-base.types'

export const initialize = async function (
    this: IInputBase,
    params: IFieldInitializationParameters
) {
    try {
        const em = new ExceptionManager(
            ...[
                // newAssert(
                //     this.field.isInitialized,
                //     `The dependency field is not properly initialized`
                // ),
                // newAssert(
                //     this.field.styler.isInitialized,
                //     `The dependency field.styler is not properly initialized`
                // ),
                // newAssert(
                //     params.descriptor?.options?.length > 0,
                //     `None options were provided. this feature will not work properly`
                // )
            ]
        )
        em.process()
        if (em.hasErrors()) {
            logManager(undefined, 'critical', 'initialize', em.toString())
        }

        const success = await abstractInitializer(
            this,
            (e) => {
                logManager(this.trackingManager, 'info', this.dependencyName, 'Initialized')
                this.isInitialized = true

                // Extend the prototype of FieldStateStyle with FieldInput's prototype
            },
            [
                notification(this, this.handleValidation, 'onValidate', 'onValidate', this.name),
                notification(this, this.handleOnBlur, 'onBlur', 'onBlur', this.name),
                notification(this, this.handleOnFocus, 'onFocus', 'onFocus', this.name)
            ]
        )

        if (success) {
            logManager(this.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.trackingManager, 'critical', this.dependencyName, e)
    }
}
