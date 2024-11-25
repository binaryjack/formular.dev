import { useEffect } from 'react'

import { FieldInput, useField } from '../../../core/field/fieldInputBase/FieldInputBase'
import { IFieldInput } from '../../../core/field/fieldInputBase/fieldInputBase.types'
import { Signals } from '../../../core/signals/signal'
import { ISignal } from '../../../core/signals/signal.type'
import { IFieldDescriptor } from '../../../dependency/common'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

export const textSignal = Signal<string>('text1', '')

const field1 = new FieldInput('1', 'MyInput', 'text', 'my-input', 'ABC')

field1.hasChanges(() => {
    console.log('Field updated', field1)
})

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FieldDemo = ({ fields }: IFieldDemoProps) => {
    useField('FieldDemo', field1 as IFieldInput)
    const handleTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        textSignal.update((s: ISignal<string>) => (s.value = e.currentTarget.value))
    }

    useEffect(() => {
        if (fields.length === 0) return
        field1.newFromField(fields[1])
    }, [field1])

    return (
        <div>
            <h1>Text demo</h1>
            <input {...field1.register()} />
            {field1.get() as string}
        </div>
    )
}
export default FieldDemo
