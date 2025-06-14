import { EventsType } from 'formular.dev.lib'

export interface ITriggerModeProps {
    handleTriggerModeChange: (mode: EventsType[]) => void
    triggerKeyWord: EventsType[]
}

export const TriggerMode = ({ handleTriggerModeChange, triggerKeyWord }: ITriggerModeProps) => {
    return (
        <div className="flex px-2  flex-col w-full">
            <label htmlFor="triggerKeyWord-v">Validation Trigger Mode:</label>
            <select
                id="triggerKeyWord-v"
                multiple
                value={triggerKeyWord}
                onChange={(e) =>
                    handleTriggerModeChange(
                        Array.from(e.target.selectedOptions, (option) => option.value as EventsType)
                    )
                }
            >
                <option value="onClick">onClick</option>
                <option value="validateOnFormFirstSubmit">validateOnFormFirstSubmit</option>
                <option value="onFocus">onFocus</option>
                <option value="onBlur">onBlur</option>
                <option value="onChange">onChange</option>
                <option value="onSubmit">onSubmit</option>
                <option value="onClear">onClear</option>
                <option value="onLoad">onLoad</option>
                <option value="reset">reset</option>
            </select>
        </div>
    )
}
