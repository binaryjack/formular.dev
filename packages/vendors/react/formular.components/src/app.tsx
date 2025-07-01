import { useService } from '@adapters/react'
import { BoundaryErrorCatcher } from '@components/error-boundary-catcher/error-boundary-catcher'
import ValidationDemoDatePicker from '@demo/validation-demos/validation-demo-date-picker'
import ValidationDemoTextInput from '@demo/validation-demos/validation-demo-text-input'
import type { IConfigurationManager } from 'formular.dev.lib'
import { SConfigurationManager } from 'formular.dev.lib'

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
        {/* <ValidationDemoSelectInput /> */}

        {/* <ValidationDemoRadioInput /> */}

        <ValidationDemoTextInput />
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

const ConfigurationTest = () => {
    const { getService } = useService()

    try {
        const configManager = getService<IConfigurationManager>(SConfigurationManager)

        if (!configManager) {
            return <div style={{ color: 'red' }}>❌ ConfigurationManager not found in DI</div>
        }

        const activeConfig = configManager.activeConfiguration

        if (!activeConfig || Object.keys(activeConfig).length === 0) {
            return <div style={{ color: 'red' }}>❌ Active configuration is empty</div>
        }

        return (
            <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
                <h3 style={{ color: 'green' }}>✅ Configuration Manager Working!</h3>
                <p>
                    <strong>Configuration Name:</strong> {activeConfig.name}
                </p>
                <p>
                    <strong>Environment:</strong> {activeConfig.targetEnvironment}
                </p>
                <p>
                    <strong>Default Culture:</strong> {activeConfig.cultures?.defaultCulture?.name}
                </p>
            </div>
        )
    } catch (error) {
        return (
            <div style={{ color: 'red' }}>
                ❌ Error accessing configuration: {(error as Error).message}
            </div>
        )
    }
}

const App = () => {
    return (
        <div className={`app flex flex-col items-center justify-center min-w-[200px] `}>
            {/* <Demos /> */}
            <BoundaryErrorCatcher>
                {/* <ButtonsDemo /> */}
                <ValidationDemoDatePicker />
                {/* <ValidationDemoCheckInput /> */}
                {/* <ValidationDemoDatePicker /> */}
                {/* <ValidationDemoDelayInput /> */}
                {/* <ValidationDemoPassword /> */}
                {/* <FormDemo /> */}
                <ConfigurationTest />
            </BoundaryErrorCatcher>
        </div>
    )
}

export default App
