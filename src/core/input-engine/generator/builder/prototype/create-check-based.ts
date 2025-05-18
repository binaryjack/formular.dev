import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { CheckBoxInput } from '@core/input-engine/variants/check-box-base/check-box-base-input'
import { ICheckBoxBaseInput } from '@core/input-engine/variants/check-box-base/check-box-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'
import { instanciateCheckBoxInput } from '../variant-constructors/instanciate-check-based'
import { instanciateClickBasedInput } from '../variant-constructors/instanciate-click-based'

export const createCheckBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): ICheckBoxBaseInput | undefined {
    try {
        if (!config.verify()) {
            return undefined
        }
        const _baseInput = this.createBaseInput(config)
        const _clickBaseInput = instanciateClickBasedInput(_baseInput!)
        const _checkInput = instanciateCheckBoxInput(_baseInput, _clickBaseInput)
        const dependencies = baseDependencyList(_baseInput, _clickBaseInput, _checkInput)

        sequenceInitializer(config, dependencies)

        if (!(_checkInput instanceof CheckBoxInput)) {
            throw Error(`The immediate clone of ${CheckBoxInput.name} is not well formed!`)
        }
        return _checkInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createCheckBased.name,
            `an error has occured when initializing ${createCheckBased.name} class: ${e.message}`
        )
        return undefined
    }
}
