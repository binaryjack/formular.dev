import { useRtiEngine } from '@components/rte-Input/hooks/use-rti-engine'
import { EventsType, newEvent } from '@core/events/events.types'
import { IExtendedFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import {
    IStateFlags,
    defaultFlagsObject
} from '@core/fields/field-state-style/field-state-style.types'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import React, { useEffect } from 'react'

export interface IUseFieldHookReturn {
    instance: IExtendedFieldInput | undefined
    flags: IStateFlags
}

export type useFieldHookType = (field?: IExtendedFieldInput) => IUseFieldHookReturn

export const useField = (field?: IExtendedFieldInput): IUseFieldHookReturn => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
    const [flags, setFlags] = React.useState<IStateFlags>(defaultFlagsObject)
    const stableField = React.useMemo(() => {
        return field
    }, [field])

    const handleRefresh = () => {
        forceUpdate()
    }

    useEffect(() => {
        if (!stableField?.field.styler?.getFlagsObject?.()) return
        setFlags(stableField?.field.styler?.getFlagsObject?.())
    }, [stableField?.field.styler?.classNames()])

    /** Bind the function handleRefresh to field events*
     */
    const acceptNotificationStrategy = (localName: string, event: EventsType) => {
        if (!stableField) return
        stableField.field.notifier?.accept(
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
