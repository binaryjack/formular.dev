import { Signals } from '../../../core/signals/signal'
import { ISignal } from '../../../core/signals/signal.type'
import BooleanChild from './BooleanChild'
import BooleanWithSignal from './BooleanWithSignal'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

export const booleanSignal = Signal<boolean>('boolean1', false)

const BooleanCheck = () => {
    useSignal('BooleanCheck', booleanSignal)
    const handleBooleanChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.checked)
        booleanSignal.update((s: ISignal<boolean>) => (s.value = e.currentTarget.checked))
    }

    return (
        <div>
            <h1>Boolean demo</h1>
            <input
                type={'checkbox'}
                id={`Boolean-checkbox`}
                title="text"
                onChange={handleBooleanChanged}
            />
            {booleanSignal.get()}
            <BooleanChild id={'12'}>
                <BooleanChild id={'13'}>
                    <BooleanChild id={'14'}>
                        <BooleanWithSignal />
                    </BooleanChild>
                </BooleanChild>
            </BooleanChild>
        </div>
    )
}
export default BooleanCheck
