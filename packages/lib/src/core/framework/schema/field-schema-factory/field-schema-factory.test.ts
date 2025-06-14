jest.mock('@core/managers/log-manager/log-manager', () => ({
    logManager: jest.fn()
}))
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldSchemaBuilder } from '../field-schema/field-schema-types'
import { FieldSchemaFactory } from './field-schema-factory'
describe('FieldSchemaFactory', () => {
    const mockBuilder = (name: string): IFieldSchemaBuilder => {
        return {
            name,
            setOptionData: jest.fn().mockReturnThis(),
            setValidationData: jest.fn().mockReturnThis(),
            build: jest.fn().mockReturnValue({ built: true, name })
        } as any
    }

    it('should add builders and create a field schema', () => {
        const factory = new (FieldSchemaFactory as any)()
        const builderA = mockBuilder('A')
        factory.addBuilders(builderA)
        const result = factory.create('A', 'target', [], false)
        expect(result).toEqual({ built: true, name: 'A' })
        expect(builderA.setOptionData).toHaveBeenCalled()
        expect(builderA.setValidationData).toHaveBeenCalled()
        expect(builderA.build).toHaveBeenCalled()
    })

    it('should return undefined and log error if builder not found', () => {
        const factory = new (FieldSchemaFactory as any)()
        const result = factory.create('NotExist', 'target', [], false)
        expect(result).toBeUndefined()
        expect(logManager).toHaveBeenCalledWith(
            undefined,
            'error',
            'FieldSchemaFactory',
            'unable to find the builder for NotExist'
        )
    })
})
