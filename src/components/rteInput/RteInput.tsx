import { useRef } from 'react'
import { RtbHeader } from './components/rtbHeader/RtbHeader'
import RteDebug from './core/debugger/RteDebug'
import { FormatsEnum, IFormatDefinition } from './core/rteInput.types'
import { useRteEngine } from './hooks/useRteEngine'

export interface IRteInputProps {
    id: string
}

export const isFormatActive = (
    activeFormatState: IFormatDefinition[] | undefined,
    expectedFormat: FormatsEnum
) => activeFormatState?.find?.((o) => o.formatName === expectedFormat)?.active ?? false

export const RteInput = ({ id }: IRteInputProps) => {
    const editorRef = useRef<HTMLDivElement>(null)

    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseLeave,
        handleMouseUp,
        handleSelectionChangeOnClick,
        handleInput,
        handleCommand,
        editorState,
        mouseState,
        handleRedo,
        handleUndo
    } = useRteEngine(editorRef)

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
                editorState={editorState}
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
                className={`flex flex-col w-[700px] h-[300px] mr-3 cursor-text min-h-[100px] p-[8px] border-2 border-slate-400 text-wrap overflow-y-auto list-decimal`}
            />

            <RteDebug editorRef={editorRef} editorState={editorState} />
        </div>
    )
}
