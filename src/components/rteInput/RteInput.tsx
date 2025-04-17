import RteDebug from './components/debugger/RteDebug'
import { RtbHeader } from './components/rtbHeader/RtbHeader'
import { IEngineState } from './core/rteInput.types'
import { useRteEngine } from './hooks/useRteEngine'

export interface IRteInputProps {
    id: string
    onStateChange?: (state: IEngineState) => void
    initialState?: Partial<IEngineState>
    editorRef: React.RefObject<HTMLDivElement>
    debug?: boolean
}

export const RteInput = ({
    id,
    onStateChange,
    initialState,
    editorRef,
    debug = false
}: IRteInputProps) => {
    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseLeave,
        handleMouseUp,
        handleSelectionChangeOnClick,
        handleInput,
        handleCommand,
        state,
        mouseState,
        handleRedo,
        handleUndo
    } = useRteEngine(editorRef, initialState, onStateChange)

    // Add keyboard shortcut handler
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            if (e.shiftKey) {
                handleRedo()
            } else {
                handleUndo()
            }
        } else if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            handleRedo()
        }
    }

    return (
        <div id={id} className={`rte-input flex flex-col w-full h-full`}>
            <RtbHeader
                engineState={state}
                handleCommand={handleCommand}
                mouseState={mouseState}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
            />

            <div
                contentEditable={true}
                suppressContentEditableWarning
                ref={editorRef}
                onMouseUp={handleMouseUp}
                onClick={handleSelectionChangeOnClick}
                onInput={handleInput}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
                className={`rte-input flex flex-col w-[700px] h-[300px] mr-3 cursor-text min-h-[100px] p-[8px] border-2 border-slate-400 text-wrap overflow-y-auto list-decimal`}
            />

            {debug && <RteDebug editorRef={editorRef} engineState={state} />}
        </div>
    )
}
