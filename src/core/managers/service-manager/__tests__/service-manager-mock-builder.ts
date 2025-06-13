import { ServiceManager } from '../service-manager'
import { IServiceManager, ServiceIdType } from '../service-manager.types'

/**
 * A builder for creating a mock ServiceManager with easy registration of mocks.
 */
export class ServiceManagerMockBuilder {
    private serviceManager: IServiceManager

    constructor(parent?: IServiceManager) {
        this.serviceManager = new ServiceManager(parent)
    }

    /**
     * Register a mock instance for a service identifier.
     */
    withMock<T>(id: ServiceIdType<T>, mock: T): this {
        this.serviceManager.registerInstance(id, mock)
        return this
    }

    /**
     * Register a mock class for a service identifier.
     */
    withMockClass<T>(id: ServiceIdType<T>, mockClass: new (...args: any[]) => T): this {
        this.serviceManager.registerClass(id, mockClass, { lifetime: 'singleton' })
        return this
    }

    /**
     * Get the built mock service manager.
     */
    build(): IServiceManager {
        return this.serviceManager
    }
}
