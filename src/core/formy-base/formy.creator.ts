import { useRtiEngine } from '@components/rte-Input/hooks/use-rti-engine'
import { EventsType, newEvent } from '@core/events/events.types'
import { useField, useFieldHookType } from '@core/factory/react/hooks/use-field'
import { FieldInputCreator } from '@core/fields/field-base-input/field-input.creator'
import { mapSchemaToFieldDescriptor } from '@core/framework/converters/to-field-descriptor'
import { IValidationLocalize } from '@core/framework/localize/localize.type'
import { TranslatioBuilderType } from '@core/framework/localize/localize.utils'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
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
        autoTracker?: INotifiableEntity
    ) {
        const fieldDescriptors = mapSchemaToFieldDescriptor(
            schema,
            translationBuilder,
            validationLocalize()
        )
        const { newFieldFromDescriptors } = FieldInputCreator
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
