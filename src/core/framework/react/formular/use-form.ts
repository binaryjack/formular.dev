import { useRtiEngine } from '@components/rte-Input/hooks/use-rti-engine'
import { IFormular } from '@core/formular-base/formular-base.types'
import { EventsType } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { nnv } from '@core/managers/notification-manager/utils/new-notification-visitor'
import React, { useEffect } from 'react'

const useForm = function (form: IFormular) {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

    const stableForm = React.useMemo(() => {
        return form
    }, [form])

    const acceptNotificationStrategy = (localName: string, event: EventsType) => {
        if (!stableForm) return
        stableForm.accept(
            nnv(
                newEvent(localName, 'useForm.accept', event, `${localName}.${event}`),
                handleRefresh.bind(useRtiEngine)
            )
        )
        stableForm.fields.forEach((field) => {
            field.accept(
                nnv(
                    newEvent(localName, 'useForm.fields.accept', event, `${localName}.${event}`),
                    handleRefresh.bind(useRtiEngine)
                )
            )
        })
    }

    const handleRefresh = () => {
        forceUpdate()
    }

    useEffect(() => {
        if (!stableForm) return
        acceptNotificationStrategy('useForm.ui.update', 'onUiUpdate')
    }, [stableForm])
}
