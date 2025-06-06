import { Signals } from '../../core/observers/signals/signal'
import { arraySignal } from './array-check'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { useSignal } = Signals

interface IBooleanWithSignal {
    children?: React.ReactNode
}

const ArrayWithSignal = ({ children }: IBooleanWithSignal) => {
    useSignal('ArrayWithSignal', arraySignal)
    return <div id={`${arraySignal.id}`}>{arraySignal.get() ? 'TRUE' : 'FALSE'}</div>
}
export default ArrayWithSignal
