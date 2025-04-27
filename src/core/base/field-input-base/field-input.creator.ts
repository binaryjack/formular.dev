import React, { useEffect } from 'react'

import { newEntitySchemeObjectType } from '../../../demo/form-demo/form-demo.schema'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IFieldSchemaBuilder } from '../../../dependency/schema/field-schema/field.schema.types'
import { INotifiableEntity } from '../../notifiable-entity/notifiable-entity-base.types'
import { TNotifierEventsType } from '../../notifiable-entity/notifications.types'
import { newNotificationVisitor } from '../../notifiable-entity/utils/new-notification-visitor'
import { defaultFlagsObject, IFlagsObject } from '../field-state-style/field-state-style.types'
import { FieldInput } from './field-input'
import { IFieldInput, SchemeToDescriptorConverterType } from './field-input.types'
import { newNotificationVisitorName } from './utils/new-notification-visitor'

export interface IUseFieldHookReturn {
    field: IFieldInput | undefined
    flags: IFlagsObject
}

export type useFieldHookType = (field?: IFieldInput) => IUseFieldHookReturn

export const FieldInputCreator = (function () {
    /**
     * Custom hook that manages field validation and state updates for a field.
     *
     * @param id - The unique identifier for the field group.
     * @param fields - A variable number of field objects that implement IFieldInputBase, IFieldDescriptor, and INotifiableEntity interfaces.
     * @returns An object containing the validation results for the fields.
     *
     * @example
     * const { validationResults } = useField('fieldGroup1', field1, field2, field3);
     *
     * @remarks
     * This hook sets up validation and change notifications for the provided fields.
     * It uses `React.useReducer` to force updates and `React.useMemo` to memoize the fields.
     * The `handleValidation` function aggregates validation results from all fields.
     * The `handleRefresh` function forces a component re-render.
     * The `useEffect` hook sets up notification handlers for field changes and validations.
     * 
     * if you need to refers to a field update in a component, use a useEffect and proceed like this:
     * 
            useEffect(() => {
                console.log('Field updated', field)
            }, [field?.get()])
     */
    const useField = (field?: IFieldInput): IUseFieldHookReturn => {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
        const [flags, setFlags] = React.useState<IFlagsObject>(defaultFlagsObject)
        const stableField = React.useMemo(() => {
            return field
        }, [field])

        const handleRefresh = () => {
            forceUpdate()
        }

        useEffect(() => {
            if (!stableField?.getFlagsObject?.()) return
            setFlags(stableField?.getFlagsObject?.())
        }, [stableField?.classNames()])

        /** Bind the function handleRefresh to field events*
         */
        const acceptNotificationStrategy = (localName: string, trigger: TNotifierEventsType) => {
            if (!stableField) return
            stableField.accept(
                newNotificationVisitor(
                    newNotificationVisitorName(trigger, stableField.id, handleRefresh.name),
                    handleRefresh.bind(useField),
                    trigger
                )
            )
        }

        useEffect(() => {
            if (!stableField) return

            /** Bind the function handleRefresh to followng field events*/
            acceptNotificationStrategy('changed_hook_field', 'changed')
            acceptNotificationStrategy('clicked_hook_field', 'clicked')
            acceptNotificationStrategy('validate_hook_field', 'validate')
        }, [stableField])

        return {
            field: stableField,
            flags: flags
        }
    }

    /**
     * Creates a new field from the provided builder, object converter, and scheme to descriptor converter.
     *
     * @param builder - The field schema builder used to build the field.
     * @param objectConverter - A function that converts the built field into a new entity scheme object.
     * @param converter - A function that converts the new entity scheme into a descriptor.
     * @returns A new instance of `_fieldInput` initialized with the generated descriptor.
     */
    const newFieldFromBuilder = (
        builder: IFieldSchemaBuilder,
        objectConverter: newEntitySchemeObjectType,
        converter: SchemeToDescriptorConverterType,
        autoTracker?: INotifiableEntity
    ) => {
        const _fieldBuild = builder.build()
        const newEntityScheme = objectConverter(`${_fieldBuild.name}-build`, _fieldBuild)
        const descriptor = converter(newEntityScheme)
        return new FieldInput(descriptor, autoTracker)
    }

    /**
     * Creates a new instance of `_fieldInput` from the given field descriptor.
     *
     * @param descriptor - The descriptor object that defines the properties of the field.
     * @returns A new instance of `_fieldInput` initialized with the provided descriptor.
     */
    const newFieldFromDescriptor = (
        descriptor: IFieldDescriptor,
        autoTracker?: INotifiableEntity
    ) => {
        return new FieldInput(descriptor, autoTracker)
    }

    /**
     * Creates an array of `IFieldInput` instances from an array of `IFieldDescriptor` objects.
     *
     * @param descriptors - An array of field descriptors used to create the field inputs.
     * @returns An array of `IFieldInput` instances created from the provided descriptors.
     */
    const newFieldFromDescriptors = (
        descriptors: IFieldDescriptor[],
        autoTracker?: INotifiableEntity
    ): IFieldInput[] => {
        const output: IFieldInput[] = []
        for (const descriptor of descriptors) {
            output.push(new FieldInput(descriptor, autoTracker))
        }
        return output
    }
    return {
        newFieldFromBuilder,
        newFieldFromDescriptor,
        newFieldFromDescriptors,
        useField
    }
})()
