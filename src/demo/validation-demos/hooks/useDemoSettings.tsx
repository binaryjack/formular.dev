import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { EventsType } from '@core/framework/events/events.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { useEffect, useState } from 'react'

export const useDemoSettings = <T extends object>(
    instance: IExtendedInput | undefined,
    internalForm: IFormular<T> | null,
    defaultValidationOptions: IValidationOptions,
    ...defaultEvents: EventsType[]
) => {
    const [submissionObject, setSubmissionObject] = useState<T>()

    const [validationOptions, setValidationOptions] =
        useState<IValidationOptions>(defaultValidationOptions)

    const [triggerKeyWord, setTriggerKeyWord] = useState<EventsType[]>([...defaultEvents])

    useEffect(() => {
        if (!internalForm) return
        internalForm?.setTriggerKeyWord(triggerKeyWord)
    }, [internalForm, triggerKeyWord])

    useEffect(() => {
        if (!instance || !validationOptions) return

        instance.input.validationOptions = validationOptions
    }, [instance, validationOptions])

    const handleValidationOptionChange = (key: keyof IValidationOptions, value: any) => {
        if (!instance) return

        setValidationOptions((prev) => ({
            ...prev,
            [key]: { ...prev?.[key], ...value }
        }))
        // instance.input.validationOptions = { ...validationOptions, [key]: value }
    }

    const handleTriggerModeChange = (mode: EventsType[]) => {
        if (!instance) return
        setTriggerKeyWord(mode)
        instance.input.validationManager.setTriggerKeyWord(mode)
    }

    return {
        submissionObject,
        setSubmissionObject,
        validationOptions,
        triggerKeyWord,
        handleTriggerModeChange,
        handleValidationOptionChange
    }
}
