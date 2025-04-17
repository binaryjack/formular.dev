import { useRef } from 'react'
import { RteInput } from '../../components/rteInput/RteInput'

const RteDemo = () => {
    const editorRef = useRef<HTMLDivElement>(null)
    return (
        <div>
            <h1>RTE Demo</h1>
            <RteInput id={'MyInput'} editorRef={editorRef} />
        </div>
    )
}

export default RteDemo
