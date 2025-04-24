import { useRef } from 'react'

import { Signals } from '../../core/signals/signal'
import { ISignal } from '../../core/signals/signal.type'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

export const arraySignal = Signal<string[]>('arraySignal', [])

const ArrayString = () => {
    useSignal('ArrayString', arraySignal)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleBooleanChanged = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const element = inputRef.current as unknown as HTMLInputElement
        if (!element) return
        arraySignal.update((s: ISignal<string[]>) => {
            if (s.value === null) {
                s.value = [element.value]
            } else {
                s.value.push(element.value)
            }
        })
    }

    return (
        <div>
            <h1>array demo</h1>
            <div>
                <label htmlFor={`newItem`}>New item</label>
                <input ref={inputRef} id={`newItem`} title={`add-todo`} />
                <button type="button" onClick={handleBooleanChanged}>
                    Add
                </button>
            </div>
            <div>
                {arraySignal.get().map((o: string) => {
                    return <div key={o}>{o}</div>
                })}
            </div>
        </div>
    )
}
export default ArrayString
