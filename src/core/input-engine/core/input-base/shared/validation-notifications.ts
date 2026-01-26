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
            baseInput.name,
            functionName,
            'onUiUpdate',
            'field',
            baseInput.name,
            data.fieldRef
        ),
        String(baseInput.id)
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
    const baseInput = data.fieldRef.input as unknown as IInputBase
    baseInput?.notificationManager?.debounceNotify(
        'onValidationChange',
        baseInput.onUiUpdateDelay,
        newEvent(
            baseInput.name,
            functionName,
            'onValidationChange',
            'field',
            baseInput.name,
            data.fieldRef
        ),
        String(baseInput.id)
    )
}
