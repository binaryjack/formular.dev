import { useMemo } from 'react'
import { ToggleButton } from '../../../toggle-button/toggle-button'
import { isFormatActive } from '../../core/helpers/is-format-active'
import { FormatsEnum, IEngineState, IMouseState } from '../../core/rti-engine.types'

interface IRtbHeader {
    engineState: IEngineState | null
    handleCommand: (command: FormatsEnum) => boolean | undefined
    handleUndo: () => void // Add these
    handleRedo: () => void // Add these
    mouseState: IMouseState
}
export const RtbHeader = ({
    engineState,
    handleCommand,
    handleUndo,
    handleRedo,
    mouseState
}: IRtbHeader) => {
    const hasSelection = useMemo(() => {
        return (engineState?.text?.length ?? -1 > 0) ? true : false
    }, [engineState?.text])

    return (
        <div className={`flex flex-row w-full h-auto my-2`}>
            <ToggleButton
                id={'boldCommand'}
                name={FormatsEnum.bold}
                toggle={isFormatActive(engineState?.activeFormatState, FormatsEnum.bold)}
                className={`flex mr-2`}
                onToggle={() => handleCommand(FormatsEnum.bold)}
                disabled={!hasSelection}
                children={<strong>B</strong>}
            />
            <ToggleButton
                id={'italicCommand'}
                name={FormatsEnum.italic}
                toggle={isFormatActive(engineState?.activeFormatState, FormatsEnum.italic)}
                className={`flex mr-2`}
                onToggle={() => handleCommand(FormatsEnum.italic)}
                disabled={!hasSelection}
                children={
                    <strong>
                        <em>i</em>
                    </strong>
                }
            />
            <ToggleButton
                id={'strikethroughCommand'}
                name={FormatsEnum.strikethrough}
                toggle={isFormatActive(engineState?.activeFormatState, FormatsEnum.strikethrough)}
                className={`flex mr-2`}
                onToggle={() => handleCommand(FormatsEnum.strikethrough)}
                disabled={!hasSelection}
                children={
                    <strong>
                        <s>St</s>
                    </strong>
                }
            />
            <ToggleButton
                id={'underlineCommand'}
                name={FormatsEnum.underline}
                toggle={isFormatActive(engineState?.activeFormatState, FormatsEnum.underline)}
                className={`flex mr-2 `}
                onToggle={() => handleCommand(FormatsEnum.underline)}
                disabled={!hasSelection}
                children={
                    <strong>
                        <u>U</u>
                    </strong>
                }
            />
            <ToggleButton
                id={'unorderedListCommand'}
                name={FormatsEnum.unorderedList}
                toggle={isFormatActive(engineState?.activeFormatState, FormatsEnum.unorderedList)}
                className={`flex`}
                onToggle={() => handleCommand(FormatsEnum.unorderedList)}
                disabled={!hasSelection}
                children={<strong>LI</strong>}
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
