import { Dommable } from '@core/dommable/dommable'
import { IDommable } from '@core/dommable/dommable.types'
import { DrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input'
import { IDrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input.types'
import { IDependencyConfiguration } from '@core/fields/field-base-input/configuration/dependency-configuration'
import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { IFieldBaseInput } from '@core/fields/field-base-input/field-input-base-types'
import { FieldStateStyle } from '@core/fields/field-state-style/field-state-style'
import { IFieldStateStyle } from '@core/fields/field-state-style/field-state-style.types'
import { NotifiableEntity } from '@core/notifiable-entity/notifiable-entity'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { Tracker } from '@core/tracker/tracker'
import { ITracker } from '@core/tracker/tracker.types'
import { ValidationStrategy } from '@core/validation-strategy/validation-strategy'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { ValueStrategy } from '@core/value-strategy/value-strategy'
import { IValueStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

// Helper function to create the base input
export const createBaseInput = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IFieldBaseInput | undefined {
    const baseInput = new FieldInput(config?.initialization?.descriptor!)

    baseInput.useNotifier(config.getDependency<INotifiableEntity>(NotifiableEntity.name))
    baseInput.useTracking(config.getDependency<ITracker>(Tracker.name))
    baseInput.useDommable(config.getDependency<IDommable<HTMLInputElement>>(Dommable.name))
    baseInput.useValidationStrategy(
        config.getDependency<IValidationStrategy>(ValidationStrategy.name)
    )

    const drawerable: IDrawerBaseInput = new DrawerBaseInput()
    const styler: IFieldStateStyle = new FieldStateStyle()
    const valueStrategy: IValueStrategy = new ValueStrategy()

    baseInput.useDrawerableState(drawerable)
    baseInput.useStyler(styler)
    baseInput.useValueStrategy(valueStrategy)

    return baseInput
}
