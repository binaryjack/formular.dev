import { IFormularManager } from '@core/managers/formular-manager/formular-manager.types'
import { createFromDescriptors } from '@core/managers/formular-manager/prototype/create-from-descriptors'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { SValidationTriggerService } from '@setup/services/validation-trigger-service'

/**
 * Verify that createFromDescriptors sets form triggers BEFORE adding fields
 * so that each field's ValidationManager receives the configured triggers.
 */

describe('FormularManager.createFromDescriptors - triggers propagation', () => {
    let mockServiceManager: jest.Mocked<IServiceManager>
    let mockFormularManager: IFormularManager

    beforeEach(() => {
        const mockValidationTriggerService = { triggers: ['onChange', 'onBlur'] }

        const mockInputFactory = {
            create: jest.fn().mockImplementation((type: string) => {
                return async (descriptor: any) => {
                    return {
                        input: {
                            id: descriptor.id,
                            name: descriptor.name,
                            validationManager: {
                                setTriggerKeyWord: jest.fn()
                            },
                            notificationManager: {
                                debounceNotify: jest.fn()
                            }
                        }
                    }
                }
            })
        }

        const lazy = jest.fn().mockImplementation((id: any) => {
            if (id === SValidationTriggerService) {
                return () => mockValidationTriggerService as any
            }
            // Return input factory for any other id used in creation
            return () => mockInputFactory as any
        })

        mockServiceManager = { lazy } as any

        mockFormularManager = {
            sm: mockServiceManager,
            forms: new Map()
        } as any
    })

    it('should set triggers on fields created from descriptors', async () => {
        const descriptors = [
            { id: 1, name: 'username', type: 'text' },
            { id: 2, name: 'email', type: 'text' }
        ] as any

        const form = await (createFromDescriptors as any).call(
            mockFormularManager,
            'test-form',
            descriptors
        )

        expect(form).toBeDefined()
        // Ensure form registered and has two fields
        expect(mockFormularManager.forms.size).toBe(1)
        expect(form.fields.length).toBe(2)

        // Each field's validation manager should receive triggers ['onChange','onBlur']
        form.fields.forEach((fld: any) => {
            expect(fld.input.validationManager.setTriggerKeyWord).toHaveBeenCalledWith([
                'onChange',
                'onBlur'
            ])
        })
    })
})
