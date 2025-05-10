import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'
import { ExceptionManager } from '@core/framework/exceptions/exception-manager'

import { logManager } from '@core/managers/log-manager/log-manager'
import { eventNotifVisitor } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { abstractInitializer } from '../abstract/abstract-initializer'
import { IFieldBaseInput } from '../field-input-base-types'

export const initialize = async function (
    this: IFieldBaseInput,
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
                eventNotifVisitor(this, this.handleValidation, 'onValidate'),
                eventNotifVisitor(this, this.handleOnBlur, 'onBlur'),
                eventNotifVisitor(this, this.handleOnFocus, 'onFocus')
                // nnv(
                //     newEvent(
                //         this.name,
                //         this.handleValidation.name,
                //         'onValidate',
                //         this.handleValidation.name
                //     ),
                //     this.handleValidation.bind(this)
                // ),
                // nnv(
                //     newEvent(this.name, this.handleOnBlur.name, 'onBlur', this.handleOnBlur.name),
                //     this.handleOnBlur.bind(this)
                // ),
                // nnv(
                //     newEvent(
                //         this.name,
                //         this.handleOnFocus.name,
                //         'onFocus',
                //         this.handleOnFocus.name
                //     ),
                //     this.handleOnFocus.bind(this)
                // )
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
