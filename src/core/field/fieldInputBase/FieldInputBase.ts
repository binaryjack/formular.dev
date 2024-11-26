import React, { useEffect } from 'react'

import { FieldValuesTypes, IFieldDescriptor } from '../../../dependency/common'
import { newEntitySchemeObjectType } from '../../../dependency/schema/demo.schema'
import { IFieldSchemeBuilder } from '../../../dependency/schema/field/field.scheme.types'
import {
    booleanTypes,
    dateTypes,
    numberTypes,
    stringTypes
} from '../../form/formBase/formBase.types'
import { notify } from '../../notifications/notifications.types'
import { FieldStateStyle } from '../fieldStateStyle/FieldStateStyle'
import { NotifiableEntity } from '../notifiableEntityBase/NotifiableEntity'
import { INotifiableEntity } from '../notifiableEntityBase/notifiableENtityBase.types'
import {
    BoleanParserStrategy,
    DateOrTimeParserStrategy,
    NumericValueParserStrategy,
    StringParserStrategy
} from '../valueStrategy/parsers.strategy'
import { ValueStrategy } from '../valueStrategy/ValueStrategy'
import { setParser } from '../valueStrategy/valueStrategy.types'
import {
    IFieldInput,
    IFieldInputBase,
    SchemeToDescriptorConverterType
} from './fieldInputBase.types'

// const Field = function () {}
//     id = 0
//     name = ''
//     label = ''
//     value = null
//     objectValue = null
//     defaultValue = null
//     type = 'fieldType'
//     errors = []
//     guides = []
//     validationOptions = {}
//     target = undefined
//     options = []
//     isValid = false
//     isDirty = false
//     isPristine = false
//     isFocus = false
//     expectedValue = undefined
//     loaded = false
//     changed = false
//     shouldValidate = false // d
// }
const defaultFieldInputCSSClassName = 'f-input'

export const FieldInputCreators = function () {
    const _fieldInput = function (this: IFieldInput, descriptor: IFieldDescriptor) {
        this.id = descriptor.id
        this.name = descriptor.name
        this.label = descriptor.label
        this.value = descriptor.value
        this.objectValue = descriptor.objectValue
        this.defaultValue = descriptor.defaultValue
        this.type = descriptor.type
        this.errors = []
        this.guides = []
        this.validationOptions = descriptor.validationOptions
        this.target = descriptor.target
        this.options = descriptor.options
        this.isValid = descriptor.isValid
        this.isDirty = descriptor.isDirty
        this.isPristine = descriptor.isPristine
        this.isFocus = descriptor.isFocus
        this.expectedValue = descriptor.expectedValue
        this.loaded = descriptor.loaded
        this.changed = descriptor.changed
        this.shouldValidate = descriptor.shouldValidate
        this.fieldStateStyle = new FieldStateStyle()
        this.className = defaultFieldInputCSSClassName

        // this.observers = new DataMutationObserverSubject()
        // this.notifiers = new Map<string, INotifier>()
        // this.computedSignalCallback = null
        this.valueStrategy = new ValueStrategy(
            setParser('DateOrTimeParserStrategy', dateTypes, DateOrTimeParserStrategy),
            setParser('NumericValueParserStrategy', numberTypes, NumericValueParserStrategy),
            setParser('StringParserStrategy', stringTypes, StringParserStrategy),
            setParser('BoleanParserStrategy', booleanTypes, BoleanParserStrategy)
        )

        this.register = function <FieldValuesTypes>() {
            const updateUI = () => {
                this.observers.trigger()
                this.notify('changed')
            }

            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                this.value = e.currentTarget.value
                this.fieldStateStyle.update('dirty', this.originalValue !== this.value)
                updateUI()
                e.stopPropagation()
                e.preventDefault()
            }

            const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                this.isFocus = false
                this.fieldStateStyle.update('focus', this.isFocus)
                updateUI()
                e.stopPropagation()
                e.preventDefault()
            }

            const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
                this.isFocus = true
                this.isPristine = false
                this.fieldStateStyle.update('pristine', this.isPristine)
                this.fieldStateStyle.update('focus', this.isFocus)
                updateUI()
                e.stopPropagation()
                e.preventDefault()
            }

            return {
                id: `${this.id}`,
                type: this.type,
                className: this.classNames(),
                label: this.label,
                onChange,
                onBlur,
                onFocus
            }
        }
        NotifiableEntity.call(this)
        this.setup = function () {
            this.observers.subscribe(this.classNames.bind(this))
        }
        this.setup()
    } as any as IFieldInput

    _fieldInput.prototype = {
        ...NotifiableEntity.prototype,
        classNames: function () {
            return `${this.className} ${this.fieldStateStyle.get()} `
        },
        hasChanges: function (callback: () => void) {
            this.observers.subscribe(callback)
        },
        validate: function () {},
        get: function () {
            return this.valueStrategy?.getValue(this) as FieldValuesTypes | null
        },
        getAsString: function () {
            return (this.value as string) ?? null
        }
    }

    const useField = (
        id: string,
        ...fields: (IFieldInputBase & IFieldDescriptor & INotifiableEntity)[]
    ) => {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

        const handleRefresh = () => {
            forceUpdate()
        }

        useEffect(() => {
            for (const field of fields) {
                field.accept(
                    notify(
                        `${id}_${field.id}_hook_${handleRefresh.name}`,
                        handleRefresh.bind(useField),
                        'changed'
                    )
                )
            }
        }, [id, ...fields])
    }

    const newFieldFromBuilder = (
        builder: IFieldSchemeBuilder,
        objectConverter: newEntitySchemeObjectType,
        converter: SchemeToDescriptorConverterType
    ) => {
        const _fieldBuild = builder.build()
        const newEntityScheme = objectConverter(`${_fieldBuild.name}-build`, _fieldBuild)
        const descriptor = converter(newEntityScheme)
        return new _fieldInput(descriptor)
    }

    const newFieldFromDescriptor = (descriptor: IFieldDescriptor) => {
        return new _fieldInput(descriptor)
    }

    const newFieldFromDescriptors = (descriptors: IFieldDescriptor[]): IFieldInput[] => {
        const output: IFieldInput[] = []
        for (const descriptor of descriptors) {
            output.push(new _fieldInput(descriptor))
        }
        return output
    }

    return {
        newFieldFromBuilder,
        newFieldFromDescriptor,
        newFieldFromDescriptors,
        useField
    }
}
