import { Signals } from '../../../core/observers/signals/signal'
import { booleanSignal } from './boolean-check'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { useSignal } = Signals

interface IBooleanWithSignal {
    children?: React.ReactNode
}

const BooleanWithSignal = ({ children }: IBooleanWithSignal) => {
    useSignal('BooleanCheck', booleanSignal)
    return <div id={`${booleanSignal.id}`}>{booleanSignal.get() ? 'TRUE' : 'FALSE'}</div>
}
export default BooleanWithSignal
