import { BoundaryErrorCatcher } from '@components/error-boundary-catcher/error-boundary-catcher'
import { FieldFactory } from '@core/factory/field-factory'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
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

const mockDescriptor: IFieldDescriptor = {
    id: 0,
    name: 'testField',
    label: 'Test Field',
    value: '',
    defaultValue: '',
    isValid: true,
    isDirty: false,
    isPristine: true,
    isFocus: false,
    objectValue: null,
    type: 'text',
    errors: [],
    guides: [],
    validationOptions: {
        requiredData: {
            required: true,
            error: 'This field is required.',
            guide: 'Please provide a value for this field.'
        },
        minLength: {
            minLength: 3,
            error: 'The value must be at least 3 characters long.',
            guide: 'Enter at least 3 characters.'
        },
        maxLength: {
            maxLength: 10,
            error: 'The value must not exceed 10 characters.',
            guide: 'Enter no more than 10 characters.'
        },
        pattern: {
            pattern: '\\d+',
            error: 'Only numeric values are allowed.',
            guide: 'Enter numbers only.'
        }
    },
    options: [],
    shouldValidate: true
}

const App = () => {
    const factory = new FieldFactory()
    const input = factory.create<ITextBaseInput>('text', mockDescriptor)
    return (
        <div className={`app flex flex-col items-center justify-center min-w-[300px]`}>
            {input && <input title={`inp`} {...input?.register()} ref={(r) => input?.ref(r)} />}
            <BoundaryErrorCatcher fallback={<div>ERROR</div>}>
                {input.field()?.name}

                {JSON.stringify(input.field()?.getValue?.())}
            </BoundaryErrorCatcher>
        </div>
    )
}

export default App
