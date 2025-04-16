import { useMemo } from 'react'
import { ToggleButton } from '../../../toggleButton/ToggleButton'
import { FormatsEnum, IEditorState, IMouseState } from '../../core/rteInput.types'
import { isFormatActive } from '../../RteInput'
interface IRtbHeader {
    editorState: IEditorState | null
    handleCommand: (command: FormatsEnum) => boolean | undefined
    handleUndo: () => void // Add these
    handleRedo: () => void // Add these
    mouseState: IMouseState
}
export const RtbHeader = ({
    editorState,
    handleCommand,
    handleUndo,
    handleRedo,
    mouseState
}: IRtbHeader) => {
    const hasSelection = useMemo(() => {
        return (editorState?.text?.length ?? -1 > 0) ? true : false
    }, [editorState?.text])

    return (
        <div className={`flex flex-row w-full h-auto my-2`}>
            <ToggleButton
                id={'boldCommand'}
                name={FormatsEnum.bold}
                toggle={isFormatActive(editorState?.activeFormatState, FormatsEnum.bold)}
                className={`flex mr-2`}
                onToggle={() => handleCommand(FormatsEnum.bold)}
                disabled={!hasSelection}
                children={<strong>B</strong>}
            />
            <ToggleButton
                id={'italicCommand'}
                name={FormatsEnum.italic}
                toggle={isFormatActive(editorState?.activeFormatState, FormatsEnum.italic)}
                className={`flex mr-2`}
                onToggle={() => handleCommand(FormatsEnum.italic)}
                disabled={!hasSelection}
                children={<em>i</em>}
            />
            <ToggleButton
                id={'strikethroughCommand'}
                name={FormatsEnum.italic}
                toggle={isFormatActive(editorState?.activeFormatState, FormatsEnum.strikethrough)}
                className={`flex mr-2`}
                onToggle={() => handleCommand(FormatsEnum.strikethrough)}
                disabled={!hasSelection}
                children={<s>St</s>}
            />
            <ToggleButton
                id={'underlineCommand'}
                name={FormatsEnum.underline}
                toggle={isFormatActive(editorState?.activeFormatState, FormatsEnum.underline)}
                className={`flex mr-2 `}
                onToggle={() => handleCommand(FormatsEnum.underline)}
                disabled={!hasSelection}
                children={<u>U</u>}
            />
            <ToggleButton
                id={'unorderedListCommand'}
                name={FormatsEnum.unorderedList}
                toggle={isFormatActive(editorState?.activeFormatState, FormatsEnum.unorderedList)}
                className={`flex`}
                onToggle={() => handleCommand(FormatsEnum.unorderedList)}
                disabled={!hasSelection}
                children={
                    <ul>
                        <li>LI</li>
                    </ul>
                }
            />

            <button
                type="button"
                title="Undo"
                onClick={handleUndo}
                className="mx-1 px-2 py-1 border border-gray-300 rounded"
            >
                ↩️ Undo
            </button>

            <button
                type="button"
                title="Redo"
                onClick={handleRedo}
                className="mx-1 px-2 py-1 border border-gray-300 rounded"
            >
                ↪️ Redo
            </button>
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
    )
}
