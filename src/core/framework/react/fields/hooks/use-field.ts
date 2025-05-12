import { useRtiEngine } from '@components/rte-Input/hooks/use-rti-engine'
import { IExtendedInput } from '@core/field-engine/core/input-base/input-base.types'
import { EventsType } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'

import { nnv } from '@core/managers/notification-manager/utils/new-notification-visitor'
import {
    defaultFieldStateFlags,
    IFieldStateFlags
} from '@core/managers/style-manager/style-manager.types'
import React, { useEffect } from 'react'

export interface IUseFieldHookReturn {
    instance: IExtendedInput | undefined
    flags: IFieldStateFlags
}

export type useFieldHookType = (field?: IExtendedInput) => IUseFieldHookReturn

export const useField = (field?: IExtendedInput): IUseFieldHookReturn => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
    const [flags, setFlags] = React.useState<IFieldStateFlags>(defaultFieldStateFlags)
    const stableField = React.useMemo(() => {
        return field
    }, [field])

    const handleRefresh = () => {
        forceUpdate()
    }

    useEffect(() => {
        if (!stableField?.input.styler?.getFlagsObject?.()) return
        setFlags(stableField?.input.styler?.getFlagsObject?.())
    }, [stableField?.input.styler?.classNames()])

    /** Bind the function handleRefresh to field events*
     */
    const acceptNotificationStrategy = (localName: string, event: EventsType) => {
        if (!stableField) return
        stableField.input.notifier?.accept(
            nnv(
                newEvent(localName, 'useField.accept', event, `${localName}.${event}`),
                handleRefresh.bind(useRtiEngine)
            )
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
