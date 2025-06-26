import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

export const SFieldDescriptorService = Symbol.for('IFieldDescriptorService')

export interface IFieldDescriptorService {
    new (sm: IServiceManager): IFieldDescriptorService
    descriptors: IFieldDescriptor[]
    // Define the methods and properties for the base input service
    // For example:
    getDescriptorByName: (name: string) => IFieldDescriptor | undefined
    getDescriptorById: (id: number) => IFieldDescriptor | undefined
    setFieldDescriptor: (descriptor: IFieldDescriptor) => void
    reset: () => void
}

export const FieldDescriptorService = function (
    this: IFieldDescriptorService,
    sm: IServiceManager
) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    this.descriptors = []
} as any as IFieldDescriptorService

Object.assign(FieldDescriptorService.prototype, {
    getDescriptorByName: function (
        this: IFieldDescriptorService,
        name: string
    ): IFieldDescriptor | undefined {
        // Implementation to get descriptor by field name
        return this.descriptors.find((descriptor) => descriptor.name === name)
    },
    getDescriptorById: function (
        this: IFieldDescriptorService,
        id: number
    ): IFieldDescriptor | undefined {
        // Implementation to get descriptor by ID
        return this.descriptors.find((descriptor) => descriptor.id === id)
    },
    setFieldDescriptor: function (
        this: IFieldDescriptorService,
        descriptor: IFieldDescriptor
    ): void {
        // Implementation to set a field descriptor
        const existingIndex = this.descriptors.findIndex((d) => d.id === descriptor.id)
        if (existingIndex !== -1) {
            this.descriptors[existingIndex] = descriptor // Update existing descriptor
        } else {
            this.descriptors.push(descriptor) // Add new descriptor
        }
    },
    reset: function (this: IFieldDescriptorService): void {
        // Implementation to reset the descriptors
        this.descriptors = [] // Clear the descriptors array
    }
})
