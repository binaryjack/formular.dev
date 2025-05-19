import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { ClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input'
import { IClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'
import { instanciateClickBasedInput } from '../variant-constructors/instanciate-click-based'

export const createClickBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IClickBaseInput | undefined {
    try {
        if (!config.verify()) {
            return undefined
        }

        const _baseInput = this.createBaseInput(config)
        const _clickInput = instanciateClickBasedInput(_baseInput)
        const dependencies = baseDependencyList(_baseInput, _clickInput)
        sequenceInitializer(config, dependencies)

        if (!(_clickInput instanceof ClickBaseInput)) {
            throw Error(`The immediate clone of ${ClickBaseInput.name} is not well formed!`)
        }
        return _clickInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createClickBased.name,
            `an error has occured when initializing ${createClickBased.name} class: ${e.message}`
        )
        return undefined
    }
}
