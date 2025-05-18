import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { EventsType } from '@core/framework/events/events.types'
import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import React, { useEffect } from 'react'

const useForm = function <T extends object>(form: IFormular<T>) {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

    const stableForm = React.useMemo(() => {
        return form
    }, [form])

    const acceptNotificationStrategy = (localName: string, event: EventsType) => {
        if (!stableForm) return
        stableForm.accept(
            notification(useForm, handleRefresh, event, `useForm.${event}`, useForm.name)
        )
        stableForm.fields.forEach((field) => {
            field.input.notificationManager.accept(
                notification(field, handleRefresh, event, `useForm.field.${event}`, useForm.name)
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
