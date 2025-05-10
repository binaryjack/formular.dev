import { Signals } from '../../../core/observers/signals/signal'
import { counter2, counter2Computed, counter2Computed2, counter2Computed3 } from './counter'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals
export const counter3 = Signal<number>('counter-value-3', 0)

const ChildComponent = () => {
    useSignal('ChildComponent', counter2)

    return (
        <div>
            Child Component
            <div>Signal Value {counter2.get()}</div>
            <div>Computed Value {counter2Computed.get()}</div>
            <div>Computed 2 Value {counter2Computed2.get()}</div>
            <div>Computed 3 Value {counter2Computed3.get()}</div>
        </div>
    )
}
export default ChildComponent
