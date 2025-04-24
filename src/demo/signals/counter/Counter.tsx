import { useState } from 'react'

import { Effects } from '../../../core/effect/effect'
import { Signals } from '../../../core/signals/signal'
import ChildComponent from './child-component'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, instances, useSignal } = Signals

export const counter3 = Signal<number>('counter-value-3', 0)

export const counter = Signal<number>('counter-value', 0)
export const counter2 = Signal<number>('counter-value-2', 0)
export const list = Signal<string[]>('list-type', ['1', '2', '3'])

const { createEffectInstance } = Effects

export const effI1 = createEffectInstance('1')
export const effI2 = createEffectInstance('2')

export const counter2Computed = counter2.computed(() => {
    return counter2.get() * 2
})

export const counter2Computed2 = counter2Computed.computed(() => {
    return counter2Computed.get() * counter.get()
})

export const counter2Computed3 = counter2Computed2.computed(() => {
    return 1000
})

counter2Computed2.onChanged(() => {
    console.log('counter2Computed2 changed!!!!')
}, [counter])

counter2Computed3.onChanged(() => {
    console.log('counter2Computed3 changed!!!!')
})

const Counter = () => {
    const [state2, setState2] = useState<number>(0)

    useSignal('Counter', counter)
    useSignal('Counter2', counter2)

    // useSignal(counter)

    effI2.effect(() => {
        console.log('effect2 triggered')
        setState2(counter.value)
        setState2(counter2.value)

        if (counter2.value && counter2?.value > 10) {
            console.log('effect2 DISPOSED')
            effI2.dispose()
        }
    }, [counter2, counter])

    // effI1.effect(() => {}, [])

    const onCounterClick = () => {
        counter.update((o: any) => o.value + 1)
        console.log(counter.value, counter2.value)
    }

    const onCounter2Click = () => {
        counter2.update((o: any) => o.value + 1)
        console.log(counter.value, counter2.value)
    }

    return (
        <div>
            <h1>Counter </h1>
            <div>updated by signal effect : {state2}</div>
            <h4>using signals with computed values</h4>
            <br />
            <button className="btn-base btn-primary mb-4" type="button" onClick={onCounterClick}>
                {`update counter  ${counter.value}`}
            </button>
            <br />
            <button className="btn-base btn-secondary mb-4" type="button" onClick={onCounter2Click}>
                {`update counter 2  ${counter2.value}`}
            </button>
            <ChildComponent />
        </div>
    )
}
export default Counter
