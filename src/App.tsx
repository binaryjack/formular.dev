import { useEffect, useState } from 'react'

import { Button } from './components/button/Button'
import { sizeConverter } from './core/hooks/screen/utils/screen.utils'
import FormDemo from './demo/forms/FormDemo'
import Positionning from './demo/positionning/Positionning'
import Counter from './demo/signals/counter/Counter'
import TextInput from './demo/signals/text/TextInput'

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
    <div>
        <h1>Forms Inputs using event driven design classes</h1>
        <h3>Patterns used: builder, strategy, observer, factory</h3>
        <FormDemo />
    </div>
)
const TextInputDemo = () => (
    <div>
        <br />
        <h1>Signals Text Input</h1>
        <h3>Patterns used: signals, observer </h3>
        <TextInput />
    </div>
)
const CounterDemo = () => (
    <div>
        <br />
        <h1>Signals Counter</h1>
        <h3>Patterns used: signals, observer </h3>
        <Counter />
    </div>
)

const PositioningDemo = () => (
    <div>
        <br />
        <Positionning />
    </div>
)

const App = () => {
    useEffect(() => {}, [])

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

    const [clickedInfo, setClickedInfo] = useState<string[]>([])
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!e.currentTarget) return
        const newCol = [...clickedInfo, `${e.currentTarget?.getAttribute('id')} has clicked!`]
        setClickedInfo(newCol)
    }
    return (
        <div className={'app flex flex-col flex-1 items-center justify-center'}>
            <Button
                onClickCallback={handleClick}
                id={'button-demo-0'}
                title={'button'}
                variant={{ rounded: true, size: '2xs', className: 'm-2' }}
            >
                Button 0 2XS
            </Button>

            <Button
                onClickCallback={handleClick}
                id={'button-demo-1'}
                title={'button'}
                variant={{ rounded: true, size: 'xs', className: 'm-2' }}
            >
                Button 1 XS
            </Button>

            <Button
                onClickCallback={handleClick}
                id={'button-demo-2'}
                title={'button-2'}
                variant={{ rounded: true, size: 'sm', className: 'm-2' }}
            >
                Button 2 SM
            </Button>

            <Button
                onClickCallback={handleClick}
                id={'button-demo-3'}
                title={'button-3'}
                variant={{ rounded: true, size: 'md', className: 'm-2' }}
            >
                Button 3 MD
            </Button>

            <Button
                onClickCallback={handleClick}
                id={'button-demo-4'}
                title={'button-4'}
                variant={{ rounded: true, size: 'lg', className: 'm-2' }}
            >
                Button 4 LG
            </Button>

            <Button
                onClickCallback={handleClick}
                id={'button-demo-5'}
                title={'button-5'}
                variant={{ rounded: true, size: 'xl', className: 'm-2' }}
            >
                Button 5 XL
            </Button>

            <Button
                onClickCallback={handleClick}
                id={'button-demo-6'}
                title={'button-6'}
                variant={{ rounded: true, size: '2xl', className: 'm-2' }}
            >
                Button 6 2XL
            </Button>

            <div>
                {clickedInfo.map((e, i) => {
                    return <div key={`${e}-${i}`}>{e}</div>
                })}
            </div>

            <div>{sizeConverter('2xs')}</div>
        </div>
    )
}

export default App
