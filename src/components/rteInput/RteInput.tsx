import { useCallback, useRef } from 'react'
import RteDebug from './components/debugger/RteDebug'
import { RtbHeader } from './components/rtbHeader/RtbHeader'
import { IStateData } from './core/rteInput.types'
import { useRteEngine } from './hooks/useRteEngine'
import './RteInput.css'

export interface IRteInputProps {
    id: string
    onStateChange: (state: IStateData) => void
    initialState: IStateData
    externalEditorRef?: React.RefObject<HTMLDivElement>
    debug?: boolean
}

export const RteInput = ({
    id,
    onStateChange,
    initialState,
    externalEditorRef,
    debug = false
}: IRteInputProps) => {
    const internalEditorRef = useRef<HTMLDivElement>(null)
    const editorRef = externalEditorRef || internalEditorRef

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
        normalizeStructure,
        handleRedo,
        handlePaste,
        handleUndo,
        handleOnBlur
    } = useRteEngine(editorRef, initialState, onStateChange)

    // Add keyboard shortcut handler
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
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
            } else if (e.key === 'Enter' && !e.shiftKey) {
                // Let the browser handle it normally, then normalize
                setTimeout(() => {
                    if (editorRef.current) {
                        normalizeStructure()
                    }
                }, 0)
            }
        },
        [handleRedo, handleUndo]
    )

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
                onPaste={handlePaste}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
                onBlur={handleOnBlur}
                className={`rte-content  rte-input flex flex-col w-full h-full mr-3 cursor-text min-h-[100px] p-[8px] border-2 border-slate-400 text-wrap overflow-y-auto`}
                tabIndex={0}
                role="textbox"
                aria-multiline="true"
                aria-label="Rich text editor"
            />

            {debug && <RteDebug editorRef={editorRef} engineState={state} />}
        </div>
    )
}
