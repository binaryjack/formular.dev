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
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
    const [flags, setFlags] = React.useState<IFieldStateFlags>(defaultFieldStateFlags)
    const stableField = React.useMemo(() => {
        return field
    }, [field])

    const handleRefresh = () => {
        forceUpdate()
        if (!stableField?.input.styleManager?.getFlagsObject?.()) return
        setFlags(stableField?.input.styleManager?.getFlagsObject?.())
    }

    useEffect(() => {
        if (!stableField?.input.styleManager?.getFlagsObject?.()) return
        setFlags(stableField?.input.styleManager?.getFlagsObject?.())
    }, [stableField?.input.styleManager?.classNames()])

    /** Bind the function handleRefresh to field events*
     */
    const acceptNotificationStrategy = (localName: string, event: EventsType) => {
        if (!stableField) return
        stableField.input.notificationManager?.accept(
            notification(useField, handleRefresh, event, `useField.${event}`, useField.name)
        )
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
