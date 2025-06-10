import { IBuilderService } from '@core/factories/input-factory/input-factory'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IInputBase, SInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IDomManager, SDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { IStyleManager, SStyleManager } from '@core/managers/style-manager/style-manager.types'
import {
    ITrackingManager,
    STrackingManager
} from '@core/managers/tracking-manager/tracker-manager.types'
import {
    IValidationManager,
    SValidationManager
} from '@core/managers/validation-manager/validation-manager.types'
import { IValueManager, SValueManager } from '@core/managers/value-manager/value-manager.types'

export const SBaseInputService = Symbol.for('IBaseInputService')

export interface IBaseInputService extends IBuilderService<IInputBase> {
    new (sm: IServiceManager): IBaseInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => IInputBase
}

export const BaseInputService = function (this: IBaseInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    this.sm = sm
    try {
        this.build = function (descriptor: IFieldDescriptor): IInputBase {
            const baseInputInstance = this.sm.resolve<IInputBase>(SInputBase)
            const domManager = this.sm.resolve<IDomManager<HTMLInputElement>>(SDomManager)
            const trackingManaget = this.sm.resolve<ITrackingManager>(STrackingManager)
            const validationManager = this.sm.resolve<IValidationManager>(SValidationManager)
            const valueManager = this.sm.resolve<IValueManager>(SValueManager)
            const styleManager = this.sm.resolve<IStyleManager>(SStyleManager)

            baseInputInstance.initializeProperties(descriptor)
            baseInputInstance.useDomManager(domManager)
            baseInputInstance.useTrackingManager(trackingManaget)
            baseInputInstance.useValidationManager(validationManager)
            baseInputInstance.useValueManager(valueManager)
            baseInputInstance.useStyleManager(styleManager)
            return baseInputInstance
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            BaseInputService.name,
            `an error has occured when initializing ${BaseInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as IBaseInputService
