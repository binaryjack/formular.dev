import { conventions } from '@conventions/conventions'
import { IEvents } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'

import { IInputBase } from '../input-base.types'

/**
 * Triggers UI update notification
 */
export const triggerUiUpdateNotification = <T extends IEvents>(
    data: T,
    functionName: string
): void => {
    if (!data?.fieldRef?.input?.notificationManager) {
        return
    }

    const baseInput = data.fieldRef.input as unknown as IInputBase
    baseInput?.notificationManager?.debounceNotify(
        'onUiUpdate',
        baseInput.onUiUpdateDelay,
        newEvent(
            data.fieldRef.input.name,
            functionName,
            'onUiUpdate',
            'field',
            data.fieldRef.input.name,
            data.fieldRef
        )
    )
}

/**
 * Triggers validation change notification
 */
export const triggerValidationChangeNotification = <T extends IEvents>(
    data: T,
    functionName: string
): void => {
    if (!data?.fieldRef?.input?.notificationManager) {
        return
    }

    ;(data.fieldRef.input as unknown as IInputBase)?.notificationManager?.debounceNotify(
        'onValidationChange',
        conventions.events.onUiUpdate.triggerDelay,
        newEvent(
            data.fieldRef.input.name,
            functionName,
            'onValidationChange',
            'field',
            data.fieldRef.input.name,
            data.fieldRef
        )
    )
}
