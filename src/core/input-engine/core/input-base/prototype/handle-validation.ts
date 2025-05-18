import { conventions } from '@components/context/conventions/conventions'
import { IEvents } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { aria } from '../../accessibility/arias'
import { IExtendedInput, IInputBase } from '../input-base.types'

export const handleValidation = function <T extends IEvents>(this: IExtendedInput, data: T) {
    try {
        if (
            data?.fieldRef?.input?.onBeforeValidation &&
            /** run custom code before validation if custom code returns false this will interrupt the validation process */
            !data?.fieldRef?.input?.onBeforeValidation?.()
        ) {
            data?.fieldRef?.input.message(
                'info',
                this.name,
                `${handleValidation.name} validtion was interrupted by custom onBeforeValidation`
            )
            return
        }

        if (data?.fieldRef?.input?.formular?.validateOnFirstSubmit) {
            data?.fieldRef?.input.message(
                'info',
                this.name,
                `${handleValidation.name} validtion was interrupted by the formular validationOnFirstSubmit property`
            )
            return
        }

        if (
            data?.fieldRef?.input?.name === undefined ||
            data?.fieldRef?.input?.value === undefined
        ) {
            return
        }

        let results: IValidationResult[] = []
        console.log(
            '----handleValidation',
            data?.fieldRef?.dependencyName,
            data?.fieldRef?.input?.value
        )

        if (!data?.fieldRef?.input?.validationManager) {
            console.warn('handleValidation', this)
            return
        }

        if (!data?.fieldRef?.input.validationManager) {
            data?.fieldRef?.input.message(
                'critical',
                this.name,
                `${handleValidation.name} has no validationOptions in order to proceed to any validation please provide valid ValidationStrategy ant the initializazion of the field. process ended`
            )
            return
        }
        data.fieldRef.input.setInputBusy(true)

        results = data?.fieldRef?.input.validationManager.validate(data?.fieldRef)

        data.fieldRef.input.setInputBusy(false)
        // keep the validation results for the field
        data.fieldRef.input.validationResults = results

        data.fieldRef.input.isValid = results.every((result) => result.state)

        data?.fieldRef?.input.styleManager?.update(
            'valid',
            results.every((result) => result.state)
        )
        data.fieldRef?.input.styleManager?.update(
            'errors',
            results.some((result) => !result.state)
        )
        data.fieldRef?.input.domManager.dmUpdateAria(
            data.fieldRef?.input.id.toString(),
            aria('invalid', data.fieldRef.input.isValid ? 'false' : 'true')
        )
        // ;(data.fieldRef?.input as unknown as IInputBase)?.refreshUi(data.fieldRef)
        ;(data.fieldRef?.input as unknown as IInputBase)?.notificationManager?.debounceNotify(
            'onUiUpdate',
            conventions.events.onUiUpdate.triggerDelay,
            newEvent(
                data.fieldRef?.input.name,
                handleValidation.name,
                'onUiUpdate',
                `field`,
                data.fieldRef?.input.name,
                data.fieldRef
            )
        )
        /** run custom code after validation */
        data?.fieldRef?.input?.onAfterValidation?.()

        return results
    } catch (e: any) {
        data?.fieldRef?.input.message('critical', this.name, `${handleValidation.name} ${e}`)
    } finally {
        data?.fieldRef?.input.setInputBusy(false)
    }
    return []
}
