import { useRtiEngine } from '@components/rte-Input/hooks/use-rti-engine'
import { mapSchemaToFieldDescriptor } from '@core/framework/converters/to-field-descriptor'

import { EventsType } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { IValidationLocalize } from '@core/framework/localize/localize.type'
import { TranslatioBuilderType } from '@core/framework/localize/localize.utils'
import { useField, useFieldHookType } from '@core/framework/react/fields/hooks/use-field'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { InputBaseCreator } from '@core/input-engine/core/input-base/input-base.creator'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { nnv } from '@core/managers/notification-manager/utils/new-notification-visitor'
import React, { useEffect } from 'react'
import { Formy } from './formy-base'
import { IFormy, IFormyFlags } from './formy-base.types'

export const FormCreator = (function () {
    const forms: Map<string, IFormy> = new Map<string, IFormy>()

    const useForm = function (form: IFormy) {
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
                        newEvent(
                            localName,
                            'useForm.fields.accept',
                            event,
                            `${localName}.${event}`
                        ),
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

    const getFieldHook = function (): useFieldHookType {
        return useField
    }

    const getForm = function (formName: string): IFormy | undefined {
        return forms.get(formName)
    }

    const getFormFlags = function (id: string): Partial<IFormyFlags> {
        const currentForm = forms.get(id)
        if (!currentForm) return {}
        return {
            isBusy: currentForm?.isBusy,
            isDirty: currentForm?.isDirty,
            isValid: currentForm?.isValid
        }
    }

    const newFormy = function (
        id: string,
        schema: IEntityScheme,
        translationBuilder: TranslatioBuilderType,
        validationLocalize: () => IValidationLocalize,
        validationTriggerModeType: EventsType[],
        autoTracker?: INotificationManager
    ) {
        const fieldDescriptors = mapSchemaToFieldDescriptor(
            schema,
            translationBuilder,
            validationLocalize()
        )
        const { newFieldFromDescriptors } = InputBaseCreator
        const formyTemp = new Formy(id, autoTracker)
        formyTemp.setValidationTriggerMode(validationTriggerModeType)
        formyTemp.addFields(...newFieldFromDescriptors(fieldDescriptors))
        forms.set(id, formyTemp)

        return formyTemp
    }

    return {
        newFormy,
        getFormFlags,
        getForm,
        getFieldHook,
        useForm
    }
})()
