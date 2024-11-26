import FieldDemo from './demo/fields/text/FieldDemo'

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

const App = () => {
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

    return (
        <div>
            <FieldDemo fields={[]} />
        </div>
    )
}

export default App
