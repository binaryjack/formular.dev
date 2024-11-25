import { useState } from 'react'

import { Effects } from '../../../core/effect/effect'
import { Signals } from '../../../core/signals/signal'
import ChildComponent from './ChildComponent'

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
    return counter2Computed.get() * 5
})

export const counter2Computed3 = counter2Computed2.computed(() => {
    return 1000
})

effI1.effect(() => {
    console.log('effect triggered')
}, [counter])

const Counter = () => {
    const [state2, setState2] = useState<number>(0)

    useSignal('Counter', counter2)

    // useSignal(counter)

    counter2.onChanged(() => {
        console.log('changed!!!!')
    })

    effI2.effect(() => {
        console.log('effect2 triggered')
        setState2(counter.value)

        if (counter2.value && counter2?.value > 10) {
            console.log('effect2 DISPOSED')
            effI2.dispose()
        }
    }, [counter2])

    const onCounterClick = () => {
        console.log(counter.value, counter2.value)
    }

    const onCounter2Click = () => {
        counter2.update((o: any) => o.value + 1)
        console.log(counter.value, counter2.value)
    }

    return (
        <div>
            <h1>Hello</h1>
            <div>updated by signal effect : {state2}</div>
            <button type="button" onClick={onCounterClick}>
                {`update counter value to ${counter.value}`}
            </button>

            <button type="button" onClick={onCounter2Click}>
                {`update counter 2 value ${counter2.value}`}
            </button>
            <ChildComponent />
        </div>
    )
}
export default Counter
