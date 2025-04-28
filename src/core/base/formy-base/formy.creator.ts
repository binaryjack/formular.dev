import React, { useEffect } from 'react'

import { useRtiEngine } from '../../../components/rte-Input/hooks/use-rti-engine'
import { IValidationLocalize } from '../../../dependency/localize/localize.type'
import { TranslatioBuilderType } from '../../../dependency/localize/localize.utils'
import { IEntityScheme } from '../../../dependency/schema/field-schema/field.schema.types'
import { mapSchemaToFieldDescriptor } from '../../../dependency/to-field-descriptor'
import { INotifiableEntity } from '../../notifiable-entity/notifiable-entity-base.types'
import { nnv } from '../../notifiable-entity/utils/new-notification-visitor'
import { EventsType, newEvent } from '../events/events.types'
import { FieldInputCreator, useFieldHookType } from '../field-input-base/field-input.creator'
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
        const { useField } = FieldInputCreator
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
