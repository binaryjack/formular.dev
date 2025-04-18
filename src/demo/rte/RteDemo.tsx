import { IStateData } from '../../components/rteInput/core/rteInput.types'
import { RteInput } from '../../components/rteInput/RteInput'

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
