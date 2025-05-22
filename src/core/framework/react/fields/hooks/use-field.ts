import { EventsType } from '@core/framework/events/events.types'
import { IExtendedInput, IInputBase } from '@core/input-engine/core/input-base/input-base.types'

import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import {
    defaultFieldStateFlags,
    IFieldStateFlags
} from '@core/managers/style-manager/style-manager.types'
import React, { useEffect } from 'react'

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
    const stableField = React.useMemo(() => {
        return field
    }, [field])

    // Add logging to track useField behavior
    console.log('useField initialized for field:', field?.input?.name)

    // Optimize handleRefresh to avoid redundant updates
    const handleRefresh = () => {
        const newFlags = stableField?.input.styleManager?.getFlagsObject?.()
        if (JSON.stringify(newFlags) !== JSON.stringify(flags)) {
            console.log('handleRefresh: Flags updated for field:', stableField?.input?.name)
            setFlags(newFlags)
        } else {
            console.log('handleRefresh: No flag changes for field:', stableField?.input?.name)
        }
    }

    // Optimize useEffect dependencies
    useEffect(() => {
        const classNames = stableField?.input.styleManager?.classNames()
        if (classNames) {
            console.log('useField useEffect triggered for field:', stableField?.input?.name)
            setFlags(stableField?.input.styleManager?.getFlagsObject?.())
        }
    }, [stableField?.input.styleManager?.classNames])

    /** Bind the function handleRefresh to field events*
     */
    const acceptNotificationStrategy = (localName: string, event: EventsType) => {
        if (!stableField) return
        stableField.input.notificationManager?.accept(
            notification(useField, handleRefresh, event, `useField.${event}`, useField.name)
        )
        stableField.input.notificationManager?.observers.subscribe(handleRefresh)
    }

    useEffect(() => {
        if (!stableField) return
        /** Bind the function handleRefresh to followng field events*/
        acceptNotificationStrategy('useField.hook.updated', 'onUiUpdate')
    }, [stableField])

    return {
        instance: stableField,
        flags: flags
    }
}
