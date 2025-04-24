import { Signals } from '../../../core/signals/signal'
import { textSignal } from './text-input'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

interface ITextChild {
    children?: React.ReactNode
}

const TextChildWithSignal = ({ children }: ITextChild) => {
    useSignal('TextInput', textSignal)
    return <div id={`${textSignal.id}`}>{textSignal.get()}</div>
}
export default TextChildWithSignal
