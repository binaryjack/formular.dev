import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'

import { abstractInitializer } from '@core/input-engine/core/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { eventNotifVisitor } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { ISelectBaseInput } from '../select-base-input.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: ISelectBaseInput,
    params: IFieldInitializationParameters
) {
    try {
        const em = new ExceptionManager(
            ...[
                newAssert(this.input !== undefined, `The dependency field is not instanciated`),
                newAssert(
                    this.input.isInitialized,
                    `${this.dependencyName}:  The dependency field is not properly initialized`
                ),
                newAssert(
                    this.optionBase?.options?.length > 0,
                    `${this.dependencyName}: The needed dependency on OptionBase is not properly initialized or none options were provided.`
                ),
                newAssert(
                    this.optionBase?.isInitialized,
                    `${this.dependencyName}: The this.optionBase is not properly initialized`
                ),
                newAssert(
                    this.clickBase?.isInitialized,
                    `${this.dependencyName}: The this.clickBase is not properly initialized`
                )
            ]
        )
        em.process()
        if (em.hasErrors()) {
            logManager(undefined, 'critical', 'initialize', em.toString())
        }

        const success = await abstractInitializer(
            this.input,
            (e) => {
                logManager(undefined, 'info', 'initialize', e.name)
            },
            [
                eventNotifVisitor(this, this.handleOnChanged, 'onChange'),
                eventNotifVisitor(this, this.handleOnSelected, 'onSelect'),
                eventNotifVisitor(this, this.handleOnClear, 'onClear')
            ]
        )

        if (success) {
            logManager(this.input.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
