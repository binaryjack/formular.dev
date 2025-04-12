import { useRef } from 'react'
import { useRteEngine } from './hooks/useRteEngine'

export interface IRteInputProps {
    id: string
}

export const RteInput = ({ id }: IRteInputProps) => {
    const editorRef = useRef<HTMLDivElement>(null)

    const {
        handleMouseDown,
        handleMouseMove,
        handleResetSelectionOnMouseUp,
        handleSelectionChangeOnClick,
        handleInput,
        handleBoldSelection,
        editorState
    } = useRteEngine(editorRef)

    const handleBold = () => {
        handleBoldSelection()
    }

    return (
        <div id={id} className={`flex flex-col w-full h-full`}>
            <div className={`flex flex-row w-full h-auto`}>
                <button type="button" title="Bold" onClick={handleBold}>
                    <b>B</b>
                </button>
            </div>

            <div
                contentEditable={true}
                suppressContentEditableWarning
                ref={editorRef}
                onMouseUp={handleResetSelectionOnMouseUp}
                onClick={handleSelectionChangeOnClick}
                onInput={handleInput}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                //onChange={handleInput}
                // onSelectCapture={handleSelection}
                // onChange={handleInput}
                // dangerouslySetInnerHTML={{ __html: content }}
                className={`flex flex-col w-[500px] h-full mr-3 cursor-text min-h-[100px] p-[8px] border-2 border-slate-400 text-wrap`}
            ></div>
            <div className=" flex flex-col  max-w-[400px] h-full text-pretty text-wrap overflow-hidden">
                <strong>Structure:</strong>
                <pre>{JSON.stringify(editorState?.content, null, 2)}</pre>
            </div>

            {editorState?.selection && (
                <>
                    <strong>Selection:</strong>
                    <pre>{JSON.stringify(editorState?.selection, null, 2)}</pre>
                </>
            )}
        </div>
    )
}
