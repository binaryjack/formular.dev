import { EventsType } from '@core/framework/events/events.types'

export interface ITriggerModeProps {
    handleTriggerModeChange: (mode: EventsType[]) => void
    validationTriggerMode: EventsType[]
}

export const TriggerMode = ({
    handleTriggerModeChange,
    validationTriggerMode
}: ITriggerModeProps) => {
    return (
        <div className="flex px-2  flex-col w-full">
            <label htmlFor="validationTriggerMode-v">Validation Trigger Mode:</label>
            <select
                id="validationTriggerMode-v"
                multiple
                value={validationTriggerMode}
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
                <option value="onLoad">onLoad</option>
                <option value="reset">reset</option>
            </select>
        </div>
    )
}
