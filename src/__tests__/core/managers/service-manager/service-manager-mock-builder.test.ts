import { ServiceIdType } from '@core/managers/service-manager/service-manager.types'
import { ServiceManagerMockBuilder } from '@tests/core/managers/service-manager-mock-builder'

describe('ServiceManagerMockBuilder', () => {
    interface IFooService {
        foo(): string
    }
    class FooService implements IFooService {
        foo() {
            return 'real'
        }
    }
    const SFooService: ServiceIdType<IFooService> = Symbol('IFooService')

    it('should register and resolve a mock instance', () => {
        const mock: IFooService = { foo: () => 'mocked' }
        const sm = new ServiceManagerMockBuilder().withMock(SFooService, mock).build()
        expect((sm.resolve(SFooService) as IFooService).foo()).toBe('mocked')
    })

    it('should register and resolve a mock class', () => {
        class MockFooService implements IFooService {
            foo() {
                return 'mock class'
            }
        }
        const sm = new ServiceManagerMockBuilder()
            .withMockClass(SFooService, MockFooService)
            .build()
        expect((sm.resolve(SFooService) as IFooService).foo()).toBe('mock class')
    })

    it('should support chaining and parent managers', () => {
        const parentMock: IFooService = { foo: () => 'parent' }
        const parent = new ServiceManagerMockBuilder().withMock(SFooService, parentMock).build()
        const sm = new ServiceManagerMockBuilder(parent).build()
        expect(sm.parent).toBe(parent)
        expect((sm.resolve(SFooService) as IFooService).foo()).toBe('parent')
    })
})
