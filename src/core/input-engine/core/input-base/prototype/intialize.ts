import { ExceptionManager } from '@core/framework/exceptions/exception-manager'

import { logManager } from '@core/managers/log-manager/log-manager'
import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { abstractInitializer } from '../../abstract/abstract-initializer'
import { IInputBase } from '../input-base.types'

export const initialize = async function (this: IInputBase) {
    try {
        const success = await abstractInitializer(
            this,
            (e) => {
                // e?.notificationManager?.observers.subscribe(this.setInputBusy.bind(this))
            },
            [
                notification(this, this.handleValidation, 'onValidate', 'onValidate', this.name),
                notification(this, this.handleOnBlur, 'onBlur', 'onBlur', this.name),
                notification(this, this.handleOnFocus, 'onFocus', 'onFocus', this.name),
                notification(this, this.handleOnKeyPress, 'onKeyPress', 'onKeyPress', this.name),
                notification(this, this.handleOnKeyUp, 'onKeyUp', 'onKeyUp', this.name),
                notification(this, this.handleOnClear, 'onClear', 'onClear', this.name)
            ]
        )

        if (success) {
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
            } else {
                this.isInitialized = true
            }
        }
    } catch (e: any) {
        logManager(this.trackingManager, 'critical', this.dependencyName, e)
    }
}
