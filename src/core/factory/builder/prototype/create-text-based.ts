import { Dommable } from '@core/dommable/dommable'
import { IDommable } from '@core/dommable/dommable.types'
import { DrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input'
import { IDrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input.types'
import { IDependencyConfiguration } from '@core/fields/field-base-input/configuration/dependency-configuration'
import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { FieldStateStyle } from '@core/fields/field-state-style/field-state-style'
import { IFieldStateStyle } from '@core/fields/field-state-style/field-state-style.types'
import { TextBaseInput } from '@core/fields/text-base-input/text-base-input'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { logManager } from '@core/general-logging-manager/log-manager'
import { InitializationManager } from '@core/initializer/manager/initialization-manager'
import { NotifiableEntity } from '@core/notifiable-entity/notifiable-entity'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { Tracker } from '@core/tracker/tracker'
import { ITracker } from '@core/tracker/tracker.types'
import { ValidationStrategy } from '@core/validation-strategy/validation-strategy'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { ValueStrategy } from '@core/value-strategy/value-strategy'
import { IValueStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const createTextBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): ITextBaseInput | undefined {
    try {
        /** First entry point */
        const _baseInput = new FieldInput(config.initialization.descriptor)

        _baseInput.useNotifier(config.getDependency<INotifiableEntity>(NotifiableEntity.name))
        _baseInput.useTracking(config.getDependency<ITracker>(Tracker.name))
        _baseInput.useDommable(config.getDependency<IDommable<HTMLInputElement>>(Dommable.name))
        _baseInput.useDrawerableState(config.getDependency<IDrawerBaseInput>(DrawerBaseInput.name))
        _baseInput.useStyler(config.getDependency<IFieldStateStyle>(FieldStateStyle.name))
        _baseInput.useValidationStrategy(
            config.getDependency<IValidationStrategy>(ValidationStrategy.name)
        )
        _baseInput.useValueStrategy(config.getDependency<IValueStrategy>(ValueStrategy.name))

        const _textInput = new TextBaseInput()

        /** Assign base field dependency */
        _textInput.field = _baseInput

        const IM = new InitializationManager(config.initialization)

        IM.addInitializer(_baseInput.dependencyName, _baseInput.initialize)
        IM.addInitializer(_textInput.dependencyName, _textInput.initialize)
        IM.executeSequences()

        if (!(_textInput instanceof TextBaseInput)) {
            throw Error(`The immediate clone of ${TextBaseInput.name} is not well formed!`)
        }

        return _textInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createTextBased.name,
            `an error has occured when initializing ${createTextBased.name} class: ${e.message}`
        )
        return undefined
    }
}
