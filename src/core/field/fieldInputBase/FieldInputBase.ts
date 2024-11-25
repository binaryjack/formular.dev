import React, { useEffect } from 'react'

import { FieldValuesTypes, IFieldDescriptor } from '../../../dependency/common'
import {
    booleanTypes,
    dateTypes,
    numberTypes,
    stringTypes
} from '../../form/formBase/formBase.types'
import { notify } from '../../notifications/notifications.types'
import { HTMLInputTypes } from '../common.types'
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
import { IFieldInput, IFieldInputBase } from './fieldInputBase.types'

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

export const FieldInput = function (
    this: IFieldInput,
    id: number,
    name: string,
    type: HTMLInputTypes,
    className: string,
    defaultValue: FieldValuesTypes | null
) {
    this.id = id
    this.name = name
    this.originalValue = defaultValue
    this.value = null
    this.objectValue = null
    this.isDirty = false
    this.isPristine = true
    this.isValid = true
    this.type = type
    this.fieldStateStyle = new FieldStateStyle()
    this.className = className

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

FieldInput.prototype = {
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
    },
    newFromField: function (field: IFieldDescriptor) {
        this.label = field.label
        this.value = field.value
        this.objectValue = field.objectValue
        this.defaultValue = field.defaultValue
        this.type = field.type
        this.errors = []
        this.guides = []
        this.validationOptions = field.validationOptions
        this.target = field.target
        this.options = field.options
        this.isValid = field.isValid
        this.isDirty = field.isDirty
        this.isPristine = field.isPristine
        this.isFocus = field.isFocus
        this.expectedValue = field.expectedValue
        this.loaded = field.loaded
        this.changed = field.changed
        this.shouldValidate = field.shouldValidate
    }
}

export const useField = (
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
