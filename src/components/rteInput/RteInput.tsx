import { useRef } from 'react'
import { ToggleButton } from '../toggle/Toggle'
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
        handleBoldSelection,
        editorState,
        mouseState
    } = useRteEngine(editorRef)

    const handleBold = () => {
        handleBoldSelection()
    }

    return (
        <div id={id} className={`flex flex-col w-full h-full`}>
            <div className={`flex flex-row w-full h-auto my-2`}>
                <ToggleButton
                    id={'boldCommand'}
                    name={'B'}
                    toggle={isFormatActive(editorState?.activeFormatState, FormatsEnum.bold)}
                    onToggle={handleBold}
                />

                <div
                    className={` w-[35px] h-[25px] mx-3 overflow-hidden ${mouseState?.down && !mouseState?.move ? 'bg-cyan-700 text-white' : mouseState?.down && mouseState?.move ? 'bg-red-500  text-white' : ''}`}
                >
                    {mouseState?.down && !mouseState?.move
                        ? 'V'
                        : mouseState?.down && mouseState?.move
                          ? '>>>'
                          : ''}
                </div>
            </div>

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
                className={`flex flex-col w-[700px] h-[300px] mr-3 cursor-text min-h-[100px] p-[8px] border-2 border-slate-400 text-wrap overflow-y-auto`}
            ></div>

            <RteDebug editorRef={editorRef} editorState={editorState} />
        </div>
    )
}
