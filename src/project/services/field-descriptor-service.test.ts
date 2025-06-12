import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { FieldDescriptorService, IFieldDescriptorService } from './field-descriptor-service'

// Mock the ServiceManager
const mockServiceManager = {} as IServiceManager

// Mock IFieldDescriptor for testing
const createMockDescriptor = (id: number, name: string): IFieldDescriptor =>
    ({
        id,
        name,
        type: 'text',
        required: false,
        label: `Label for ${name}`,
        placeholder: `Placeholder for ${name}`,
        value: '',
        objectValue: null,
        defaultValue: '',
        errors: [],
        guides: [],
        validationOptions: {
            required: { value: false }
        },
        target: undefined,
        options: [],
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        expectedValue: undefined,
        loaded: false,
        changed: false,
        shouldValidate: false,
        mask: undefined,
        validation: {},
        events: {},
        style: {},
        attributes: {}
    }) as IFieldDescriptor

describe('FieldDescriptorService', () => {
    let service: IFieldDescriptorService

    beforeEach(() => {
        service = new (FieldDescriptorService as any)(mockServiceManager)
    })

    describe('constructor', () => {
        it('should create service instance with empty descriptors array', () => {
            expect(service.descriptors).toEqual([])
        })

        it('should throw error when ServiceManager is not provided', () => {
            expect(() => {
                new (FieldDescriptorService as any)(null)
            }).toThrow(
                'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
            )

            expect(() => {
                new (FieldDescriptorService as any)(undefined)
            }).toThrow(
                'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
            )
        })
    })

    describe('setFieldDescriptor', () => {
        it('should add new descriptor when it does not exist', () => {
            const descriptor = createMockDescriptor(1, 'firstName')

            service.setFieldDescriptor(descriptor)

            expect(service.descriptors).toHaveLength(1)
            expect(service.descriptors[0]).toBe(descriptor)
        })

        it('should update existing descriptor when id matches', () => {
            const originalDescriptor = createMockDescriptor(1, 'firstName')
            const updatedDescriptor = createMockDescriptor(1, 'updatedFirstName')

            service.setFieldDescriptor(originalDescriptor)
            service.setFieldDescriptor(updatedDescriptor)

            expect(service.descriptors).toHaveLength(1)
            expect(service.descriptors[0]).toBe(updatedDescriptor)
            expect(service.descriptors[0].name).toBe('updatedFirstName')
        })

        it('should add multiple descriptors with different ids', () => {
            const descriptor1 = createMockDescriptor(1, 'firstName')
            const descriptor2 = createMockDescriptor(2, 'lastName')
            const descriptor3 = createMockDescriptor(3, 'email')

            service.setFieldDescriptor(descriptor1)
            service.setFieldDescriptor(descriptor2)
            service.setFieldDescriptor(descriptor3)

            expect(service.descriptors).toHaveLength(3)
            expect(service.descriptors[0]).toBe(descriptor1)
            expect(service.descriptors[1]).toBe(descriptor2)
            expect(service.descriptors[2]).toBe(descriptor3)
        })
    })

    describe('getDescriptorByName', () => {
        beforeEach(() => {
            const descriptor1 = createMockDescriptor(1, 'firstName')
            const descriptor2 = createMockDescriptor(2, 'lastName')
            const descriptor3 = createMockDescriptor(3, 'email')

            service.setFieldDescriptor(descriptor1)
            service.setFieldDescriptor(descriptor2)
            service.setFieldDescriptor(descriptor3)
        })

        it('should return descriptor when name matches', () => {
            const result = service.getDescriptorByName('firstName')

            expect(result).toBeDefined()
            expect(result?.id).toBe(1)
            expect(result?.name).toBe('firstName')
        })

        it('should return undefined when name does not match', () => {
            const result = service.getDescriptorByName('nonExistentField')

            expect(result).toBeUndefined()
        })

        it('should return first match when multiple descriptors have same name', () => {
            const duplicateDescriptor = createMockDescriptor(4, 'firstName')
            service.setFieldDescriptor(duplicateDescriptor)

            const result = service.getDescriptorByName('firstName')

            expect(result?.id).toBe(1) // Should return the first one
        })

        it('should be case sensitive', () => {
            const result1 = service.getDescriptorByName('firstName')
            const result2 = service.getDescriptorByName('firstname')
            const result3 = service.getDescriptorByName('FIRSTNAME')

            expect(result1).toBeDefined()
            expect(result2).toBeUndefined()
            expect(result3).toBeUndefined()
        })
    })

    describe('getDescriptorById', () => {
        beforeEach(() => {
            const descriptor1 = createMockDescriptor(1, 'firstName')
            const descriptor2 = createMockDescriptor(2, 'lastName')
            const descriptor3 = createMockDescriptor(3, 'email')

            service.setFieldDescriptor(descriptor1)
            service.setFieldDescriptor(descriptor2)
            service.setFieldDescriptor(descriptor3)
        })

        it('should return descriptor when id matches', () => {
            const result = service.getDescriptorById(2)

            expect(result).toBeDefined()
            expect(result?.id).toBe(2)
            expect(result?.name).toBe('lastName')
        })

        it('should return undefined when id does not match', () => {
            const result = service.getDescriptorById(999)

            expect(result).toBeUndefined()
        })

        it('should handle edge case ids', () => {
            const descriptor0 = createMockDescriptor(0, 'zeroId')
            const descriptorNeg = createMockDescriptor(-1, 'negativeId')

            service.setFieldDescriptor(descriptor0)
            service.setFieldDescriptor(descriptorNeg)

            expect(service.getDescriptorById(0)?.name).toBe('zeroId')
            expect(service.getDescriptorById(-1)?.name).toBe('negativeId')
        })
    })

    describe('reset', () => {
        it('should clear all descriptors', () => {
            const descriptor1 = createMockDescriptor(1, 'firstName')
            const descriptor2 = createMockDescriptor(2, 'lastName')

            service.setFieldDescriptor(descriptor1)
            service.setFieldDescriptor(descriptor2)

            expect(service.descriptors).toHaveLength(2)

            service.reset()

            expect(service.descriptors).toEqual([])
            expect(service.descriptors).toHaveLength(0)
        })

        it('should reset empty descriptors array without error', () => {
            expect(service.descriptors).toHaveLength(0)

            expect(() => service.reset()).not.toThrow()

            expect(service.descriptors).toEqual([])
        })

        it('should allow adding descriptors after reset', () => {
            const descriptor1 = createMockDescriptor(1, 'firstName')
            const descriptor2 = createMockDescriptor(2, 'lastName')

            service.setFieldDescriptor(descriptor1)
            service.reset()
            service.setFieldDescriptor(descriptor2)

            expect(service.descriptors).toHaveLength(1)
            expect(service.descriptors[0]).toBe(descriptor2)
        })
    })

    describe('integration tests', () => {
        it('should handle complete workflow', () => {
            // Add initial descriptors
            const firstName = createMockDescriptor(1, 'firstName')
            const lastName = createMockDescriptor(2, 'lastName')
            const email = createMockDescriptor(3, 'email')

            service.setFieldDescriptor(firstName)
            service.setFieldDescriptor(lastName)
            service.setFieldDescriptor(email)

            // Verify retrieval by name and id
            expect(service.getDescriptorByName('firstName')).toBe(firstName)
            expect(service.getDescriptorById(2)).toBe(lastName)

            // Update existing descriptor
            const updatedEmail = createMockDescriptor(3, 'emailAddress')
            service.setFieldDescriptor(updatedEmail)

            expect(service.descriptors).toHaveLength(3)
            expect(service.getDescriptorById(3)).toBe(updatedEmail)
            expect(service.getDescriptorByName('email')).toBeUndefined()
            expect(service.getDescriptorByName('emailAddress')).toBe(updatedEmail)

            // Reset and verify clean state
            service.reset()
            expect(service.descriptors).toHaveLength(0)
            expect(service.getDescriptorByName('firstName')).toBeUndefined()
            expect(service.getDescriptorById(1)).toBeUndefined()
        })
    })
})
