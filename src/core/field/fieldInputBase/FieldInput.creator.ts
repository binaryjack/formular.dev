import React, { useEffect } from 'react'

import { newEntitySchemeObjectType } from '../../../dependency/schema/demo.schema'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IFieldSchemaBuilder } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { notify, TNotifierType } from '../../notifications/notifications.types'
import { defaultFlagsObject, IFlagsObject } from '../fieldStateStyle/fieldStateStyle.types'
import { FieldInput } from './FieldInput'
import { IFieldInput, SchemeToDescriptorConverterType } from './fieldInput.types'

export interface IUseFieldHookReturn {
    field: IFieldInput | undefined
    flags: IFlagsObject
}

export type useFieldHookType = (
    nameOrId?: string | number,
    fields?: IFieldInput[]
) => IUseFieldHookReturn

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
    const useField = (nameOrId?: string | number, fields?: IFieldInput[]): IUseFieldHookReturn => {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
        const [flags, setFlags] = React.useState<IFlagsObject>(defaultFlagsObject)
        const stableField = React.useMemo(() => {
            const field = fields?.find?.((f) => {
                if (typeof nameOrId === 'number') {
                    return f.id === nameOrId
                } else if (typeof nameOrId === 'string') {
                    return f.name === nameOrId
                }
            })

            return field
        }, [fields])

        const handleRefresh = () => {
            forceUpdate()
        }

        useEffect(() => {
            if (!stableField?.getFlagsObject?.()) return
            setFlags(stableField?.getFlagsObject?.())
        }, [stableField?.classNames()])

        const acceptNotificationStrategy = (localName: string, trigger: TNotifierType) => {
            if (!stableField) return
            stableField.accept(
                notify(
                    `${stableField.id}_${localName}_${handleRefresh.name}`,
                    handleRefresh.bind(useField),
                    trigger
                )
            )
        }

        useEffect(() => {
            if (!stableField) return
            acceptNotificationStrategy('changed_hook_field', 'changed')
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
        converter: SchemeToDescriptorConverterType
    ) => {
        const _fieldBuild = builder.build()
        const newEntityScheme = objectConverter(`${_fieldBuild.name}-build`, _fieldBuild)
        const descriptor = converter(newEntityScheme)
        return new FieldInput(descriptor)
    }

    /**
     * Creates a new instance of `_fieldInput` from the given field descriptor.
     *
     * @param descriptor - The descriptor object that defines the properties of the field.
     * @returns A new instance of `_fieldInput` initialized with the provided descriptor.
     */
    const newFieldFromDescriptor = (descriptor: IFieldDescriptor) => {
        return new FieldInput(descriptor)
    }

    /**
     * Creates an array of `IFieldInput` instances from an array of `IFieldDescriptor` objects.
     *
     * @param descriptors - An array of field descriptors used to create the field inputs.
     * @returns An array of `IFieldInput` instances created from the provided descriptors.
     */
    const newFieldFromDescriptors = (descriptors: IFieldDescriptor[]): IFieldInput[] => {
        const output: IFieldInput[] = []
        for (const descriptor of descriptors) {
            output.push(new FieldInput(descriptor))
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
