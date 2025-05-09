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
        if (!config.verify()) {
            return undefined
        }
        /** First entry point */
        const _baseInput = new FieldInput(config?.initialization?.descriptor!)

        _baseInput.useNotifier(config.getDependency<INotifiableEntity>(NotifiableEntity.name))
        _baseInput.useTracking(config.getDependency<ITracker>(Tracker.name))
        _baseInput.useDommable(config.getDependency<IDommable<HTMLInputElement>>(Dommable.name))
        _baseInput.useValidationStrategy(
            config.getDependency<IValidationStrategy>(ValidationStrategy.name)
        )

        const _textInput = new TextBaseInput()

        /** Assign base field dependency */
        _textInput.field = _baseInput

        const drawerable: IDrawerBaseInput = new DrawerBaseInput()
        const styler: IFieldStateStyle = new FieldStateStyle()
        const valueStrategy: IValueStrategy = new ValueStrategy()

        _baseInput.useDrawerableState(drawerable)
        _baseInput.useStyler(styler)
        _baseInput.useValueStrategy(valueStrategy)

        const IM = new InitializationManager(config?.initialization!)

        IM.addInitializer(
            _baseInput.dom.dependencyName,
            _baseInput.dom.initialize.bind(_baseInput.dom)
        )
        IM.addInitializer(
            _baseInput.tracker.dependencyName,
            _baseInput.tracker.initialize.bind(_baseInput.tracker)
        )
        IM.addInitializer(
            _baseInput.drawer.dependencyName,
            _baseInput.drawer.initialize.bind(_baseInput.drawer)
        )
        IM.addInitializer(
            _baseInput.styler.dependencyName,
            _baseInput.styler.initialize.bind(_baseInput.styler)
        )
        IM.addInitializer(
            _baseInput.notifier.dependencyName,
            _baseInput.notifier.initialize.bind(_baseInput.notifier)
        )
        IM.addInitializer(
            _baseInput.validationStrategy.dependencyName,
            _baseInput.validationStrategy.initialize.bind(_baseInput.validationStrategy)
        )
        IM.addInitializer(
            _baseInput.valueStrategy.dependencyName,
            _baseInput.valueStrategy.initialize.bind(_baseInput.valueStrategy)
        )
        IM.addInitializer(_baseInput.dependencyName, _baseInput.initialize.bind(_baseInput))
        IM.addInitializer(_textInput.dependencyName, _textInput.initialize.bind(_textInput))
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
