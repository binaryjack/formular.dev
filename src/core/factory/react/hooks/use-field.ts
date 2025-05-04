import { useRtiEngine } from '@components/rte-Input/hooks/use-rti-engine'
import { EventsType, newEvent } from '@core/events/events.types'
import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import {
    IFlagsObject,
    defaultFlagsObject
} from '@core/fields/field-state-style/field-state-style.types'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import React, { useEffect } from 'react'

export interface IUseFieldHookReturn {
    field: IFieldInput | undefined
    flags: IFlagsObject
}

export type useFieldHookType = (field?: IFieldInput) => IUseFieldHookReturn

export const useField = (field?: IFieldInput): IUseFieldHookReturn => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
    const [flags, setFlags] = React.useState<IFlagsObject>(defaultFlagsObject)
    const stableField = React.useMemo(() => {
        return field
    }, [field])

    const handleRefresh = () => {
        forceUpdate()
    }

    useEffect(() => {
        if (!stableField?._style?.getFlagsObject?.()) return
        setFlags(stableField?._style?.getFlagsObject?.())
    }, [stableField?._style?.classNames()])

    /** Bind the function handleRefresh to field events*
     */
    const acceptNotificationStrategy = (localName: string, event: EventsType) => {
        if (!stableField) return
        stableField._notifier?.accept(
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
        field: stableField,
        flags: flags
    }
}
