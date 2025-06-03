import { IExtendedInput, IInputBase } from '@core/input-engine/core/input-base/input-base.types'

import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import {
    defaultFieldStateFlags,
    IFieldStateFlags
} from '@core/managers/style-manager/style-manager.types'
import React, { useCallback, useEffect } from 'react'

export interface IUseFieldHookReturn<T extends IInputBase | IExtendedInput> {
    instance: T | undefined
    flags: IFieldStateFlags
}

export type useFieldHookType = <T extends IInputBase | IExtendedInput>(
    field?: T
) => IUseFieldHookReturn<T>

export const useField = <T extends IExtendedInput | IInputBase>(
    field?: T
): IUseFieldHookReturn<T> => {
    const [flags, setFlags] = React.useState<IFieldStateFlags>(defaultFieldStateFlags)
    const [value, setValue] = React.useState(field?.input?.value)
    const [renderCount, setRenderCount] = React.useState(0)

    const stableField = React.useMemo(() => field, [field])

    // Add logging to track useField behavior
    // console.log('useField initialized for field:', field?.input?.name)    // Optimize handleRefresh to avoid redundant updates
    const handleRefresh = useCallback(() => {
        const newFlags = stableField?.input.styleManager?.getFlagsObject?.()
        const newValue = stableField?.input?.value
        console.log('useField handleRefresh triggered for field:', stableField?.input?.name)
        // More efficient comparison for boolean flags
        const flagsChanged =
            newFlags &&
            (!flags ||
                Object.keys(newFlags).some(
                    (key) =>
                        newFlags[key as keyof IFieldStateFlags] !==
                        flags[key as keyof IFieldStateFlags]
                ))

        if (flagsChanged) {
            setFlags(newFlags)
        }
        // Update value
        if (newValue !== value) {
            setValue(newValue)
        }
        setRenderCount((prev) => prev + 1)
    }, [stableField, flags, value])

    // Optimize useEffect dependencies
    useEffect(() => {
        const classNames = stableField?.input.styleManager?.classNames()
        if (classNames) {
            console.log('useField useEffect triggered for field:', stableField?.input?.name)
            setFlags(stableField?.input.styleManager?.getFlagsObject?.())
        }
    }, [stableField?.input.styleManager?.classNames])

    useEffect(() => {
        if (!stableField) return
        /** Bind the function handleRefresh to followng field events*/
        const notifications = [
            notification(
                stableField,
                handleRefresh,
                'onUiUpdate',
                'useField.onUiUpdate',
                'useField'
            ),
            // notification(
            //     stableField,
            //     handleRefresh,
            //     'onValueChange',
            //     'useField.onValueChange',
            //     'useField'
            // ),
            // notification(
            //     stableField,
            //     handleRefresh,
            //     'onValidationChange',
            //     'useField.onValidationChange',
            //     'useField'
            // ),
            notification(stableField, handleRefresh, 'onFocus', 'useField.onFocus', 'useField'),
            notification(stableField, handleRefresh, 'onBlur', 'useField.onBlur', 'useField')
        ]

        notifications.forEach((notif) => stableField.input.notificationManager?.accept(notif))

        return () => {
            stableField.input.notificationManager?.observers.unSubscribe(handleRefresh)
            notifications.forEach((notif) => stableField.input.notificationManager?.dismiss(notif))
            console.log('useField cleanup for field:', stableField?.input?.name)
        }
    }, [stableField])

    return {
        instance: stableField,
        flags
    }
}
