import { ISignal } from '../../../core/signals/signal.type'
import { textSignal } from '../../fields/text/FieldDemo'

interface IBooleanChild {
    id: string
    children?: React.ReactNode
}

const BooleanChild = ({ id, children }: IBooleanChild) => {
    return <div id={id}>{children}</div>
}
export default BooleanChild
export const FieldDemo = () => {
    // useField('FieldDemo', field1)
    // useSignal('TextInput', textSignal)
    const handleTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        textSignal.update((s: ISignal<string>) => (s.value = e.currentTarget.value))
    }

    return (
        <div>
            <h1>Text demo</h1>
            {/* <input {...field1.register()} />
            {field1.get() as string} */}
        </div>
    )
}
