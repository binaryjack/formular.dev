import {
    IServiceManager,
    SServiceManager
} from '@core/managers/service-manager/service-manager.types'
import { InputFactory, SInputFactory } from '../input-factory/input-factory'

export const setupInputsFactory = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    sm.registerClass(SInputFactory, InputFactory, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })
}
