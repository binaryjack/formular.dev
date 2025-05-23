import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { MaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input'
import { IMaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'
import { instanciateMaskedBaseInput } from '../variant-constructors/instanciate-masked-based'

export const createMaskedBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IMaskedBaseInput | undefined {
    try {
        if (!config.verify()) {
            return undefined
        }

        const _baseInput = this.createBaseInput(config)
        const _maskedInput = instanciateMaskedBaseInput(
            _baseInput!,
            config.initialization?.descriptor.mask ?? ''
        )
        _maskedInput.input = _baseInput
        const dependencies = baseDependencyList(_baseInput, _maskedInput)

        sequenceInitializer(config, dependencies)

        if (!(_maskedInput instanceof MaskedBaseInput)) {
            throw Error(`The immediate clone of ${MaskedBaseInput.name} is not well formed!`)
        }

        return _maskedInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createMaskedBased.name,
            `an error has occured when initializing ${createMaskedBased.name} class: ${e.message}`
        )
        return undefined
    }
}
