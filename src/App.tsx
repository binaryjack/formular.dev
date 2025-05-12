import { conventions } from '@components/context/conventions/conventions'
import FieldSet from '@components/field-set/field-set'
import ValidationResultComponent from '@components/validation-result/validation-result'

import { useField } from '@core/framework/react/fields/hooks/use-field'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { InputsProvider } from '@core/input-engine/generator/input-provider'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { txtFileDescriptorMock } from '@mocks/txt-file-descriptor-mock'
import { validationOptionsMock } from '@mocks/validation-options-mock'
import { useState } from 'react'
import FieldInputValidationSandbox from './demo/validation-demo/validation-demo'

interface IApp extends Node {
    testName?: string
}

interface IControlsDemo {
    id: string
    selectShowrooms: string
    inputControl: string
    selectOptionsId: string
    trueFalseValue: boolean
    dateTimeValue: string
    selectedRadioId: number
    richTextField: string
    rangeSlider: number
    userName: string
    password: string
    toggle: boolean
}

const newFormObject: IControlsDemo = {
    id: '1',
    selectShowrooms: '0',
    inputControl: 'test',
    selectOptionsId: '0',
    trueFalseValue: true,
    dateTimeValue: '2012-07-12',
    selectedRadioId: 1,
    richTextField: '',
    rangeSlider: 69,
    userName: '',
    password: '',
    toggle: false
}

const formDemo = () => (
    <>
        <h1>Forms Inputs using event driven design classes</h1>
        <h3>Patterns used: builder, strategy, observer, factory</h3>
        {/* <FormDemo /> */}
    </>
)
const TextInputDemo = () => (
    <>
        <br />
        <h1>Signals Text Input</h1>
        <h3>Patterns used: signals, observer </h3>
        {/* <TextInput /> */}
    </>
)
const CounterDemo = () => (
    <>
        <br />
        <h1>Signals Counter</h1>
        <h3>Patterns used: signals, observer </h3>
        {/* <Counter /> */}
    </>
)

const PositioningDemo = () => (
    <>
        <br />
        {/* <Positionning /> */}
    </>
)

const buttonsDemo = () => (
    <div className={'app flex flex-col flex-1 items-center justify-center'}>
        {/* <ButtonsDemo /> */}
    </div>
)

const validationDemo = () => (
    <div className={'app flex flex-col w-full flex-1 items-center justify-center'}>
        <FieldInputValidationSandbox />
    </div>
)

// const [fields, setFields] = useState<IFieldDescriptor[]>([])
// useEffect(() => {
// build a schema for the fields to be used
// const item = controlDemoSchema
// // map schema to fieldsDescriptors collection from schema
// const fieldDescriptors = mapSchemaToFieldDescriptor(item)

// setFields(fieldDescriptors)
//     // map object values to fieldsDescriptors collection
//     // const fields = mapObjectToFields(fieldDescriptors, newFormObject)

//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [])

const App = () => {
    const [validationOptions, setValidationOptions] =
        useState<IValidationOptions>(validationOptionsMock)

    const input = InputsProvider(
        [txtFileDescriptorMock(validationOptions)],
        defaultInitializationParameters,
        defaultInitializationDependencies
    )?.[0]

    const { instance, flags } = useField(input as unknown as IExtendedInput)
    return (
        <div className={`app flex flex-col items-center justify-center min-w-[300px]`}>
            <div>
                <FieldSet
                    inputId={instance?.input.name ?? conventions.IdIsEmpty()}
                    label={instance?.input.label}
                    type={instance?.input.type}
                    flags={flags}
                    validationChildren={
                        <ValidationResultComponent
                            validationResults={instance?.input.validationResults ?? []}
                        />
                    }
                    onClear={() => instance?.input.clear()}
                >
                    <input
                        data-class="base-input"
                        {...instance?.register()}
                        ref={(r) => instance?.ref(r)}
                    />
                </FieldSet>

                <button type="button" onClick={() => instance?.input.setFocus()}>
                    focus Field
                </button>
                <button type="button" onClick={() => instance?.input.enable(true)}>
                    enable
                </button>
                <button type="button" onClick={() => instance?.input.enable(false)}>
                    disable
                </button>
                <button type="button" onClick={() => instance?.input.clear()}>
                    clear
                </button>
            </div>
        </div>
    )
}

export default App
