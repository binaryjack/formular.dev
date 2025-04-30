import { IStateData } from '@components/rte-Input/core/rti-engine.types'
import { RteInput } from '@components/rte-Input/rte-input'

const RteDemo = () => {
    return (
        <div>
            <h1>RTE Demo</h1>
            <RteInput
                id={'MyInput'}
                onStateChange={function (state: IStateData): void {}}
                initialState={{} as IStateData}
            />
        </div>
    )
}

export default RteDemo
