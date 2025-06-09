import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { BaseInputService } from '../../core/factories/input-builder-services/base-input-service'

export const setupFieldBuilderService = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    sm.registerClass(BaseInputService, { dependencies: [] })
}
