import { IDependencyConfiguration } from '@core/field-engine/core/configuration/dependency-configuration'
import { InputBase } from '@core/field-engine/core/input-base/input-base'
import { IInputBase } from '@core/field-engine/core/input-base/input-base.types'
import { DrawerBaseInput } from '@core/field-engine/variants/drawer-base/drawer-base-input'
import { IDrawerBaseInput } from '@core/field-engine/variants/drawer-base/drawer-base-input.types'
import { DomManager } from '@core/managers/dom-manager/dom-manager'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { NotifiableEntity } from '@core/managers/notification-manager/notification-manager'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { StyleManager } from '@core/managers/style-manager/style-manager'
import { IStyleManager } from '@core/managers/style-manager/style-manager.types'
import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { ValidationManager } from '@core/managers/validation-manager/validation-manager'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { ValueStrategy } from '@core/managers/value-manager/value-manager'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'
import { IFieldBuilder } from '../field-builder'

// Helper function to create the base input
export const createBaseInput = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IInputBase | undefined {
    const baseInput = new InputBase(config?.initialization?.descriptor!)

    baseInput.useNotificationManager(
        config.getDependency<INotificationManager>(NotifiableEntity.name)
    )
    baseInput.useTrackingManager(config.getDependency<ITrackingManager>(TrackingManager.name))
    baseInput.useDomManager(config.getDependency<IDomManager<HTMLInputElement>>(DomManager.name))
    baseInput.useValidationManager(config.getDependency<IValidationManager>(ValidationManager.name))

    const drawerable: IDrawerBaseInput = new DrawerBaseInput()
    const styler: IStyleManager = new StyleManager()
    const valueStrategy: IValueManager = new ValueStrategy()

    baseInput.useDrawerManager(drawerable)
    baseInput.useStyleManager(styler)
    baseInput.useValueManager(valueStrategy)

    return baseInput
}
