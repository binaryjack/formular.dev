import { conventions } from '@components/context/conventions/conventions'
import FieldSet from '@components/field-set/field-set'
import { useField } from '@components/formy/formy.context'
import ValidationResultComponent from '@components/validation-result/validation-result'
import { FieldFactory } from '@core/factory/field-factory'
import { IExtendedFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { NotifiableEntity } from '@core/notifiable-entity/notifiable-entity'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
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

const mockOptions: IOptionItem[] = [
    {
        id: '1',
        sequenceId: 1,
        value: 'option1',
        text: 'Option 1',
        disabled: false,
        selected: false
    },
    {
        id: '2',
        sequenceId: 2,
        value: 'option2',
        text: 'Option 2',
        disabled: false,
        selected: false
    },
    {
        id: '3',
        sequenceId: 3,
        value: 'option3',
        text: 'Option 3',
        disabled: false,
        selected: false
    }
]

const mockDescriptor: IFieldDescriptor = {
    id: 0,
    name: 'testField',
    label: 'Test Field',
    value: 'test',
    defaultValue: 'super',
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
    options: mockOptions,
    shouldValidate: true
}

const notifierInstance: INotifiableEntity = new NotifiableEntity()

const App = () => {
    const factory = new FieldFactory()
    const input = factory.create<ITextBaseInput>('text', mockDescriptor, notifierInstance)
    const select = factory.create<ISelectBaseInput>('select', mockDescriptor, notifierInstance)

    const { instance: field, flags } = useField(input as IExtendedFieldInput)
    return (
        <div className={`app flex flex-col items-center justify-center min-w-[300px]`}>
            <div>
                <FieldSet
                    inputId={field?.field.name ?? conventions.IdIsEmpty()}
                    label={field?.field.label}
                    type={field?.field.type}
                    flags={flags}
                    validationChildren={
                        <ValidationResultComponent
                            validationResults={field?.field.validationResults ?? []}
                        />
                    }
                    onClear={() => field?.field.clear()}
                >
                    <input
                        data-class="base-input"
                        {...field?.register()}
                        ref={(r) => field?.ref(r)}
                    />
                </FieldSet>

                <button onClick={() => field?.field.setFocus()}>focus Field</button>
                <button onClick={() => field?.field.enable(true)}>enable</button>
                <button onClick={() => field?.field.enable(false)}>disable</button>
                <button onClick={() => field?.field.clear()}>clear</button>
            </div>
        </div>
    )
}

export default App
