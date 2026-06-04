import { createForm, f } from '../index'
import { SFormularManager } from '../core/managers/formular-manager/formular-manager.types'
import { IFormularManager } from '../core/managers/formular-manager/formular-manager.types'
import { SetupHelpers } from '../setup/core/setup-helpers'

describe('simple-api', () => {
    describe('schemaToDescriptors / createForm', () => {
        it('should correctly infer input types and basic validation options from schema', async () => {
            const schema = f.object({
                username: f.string().min(3).max(20).nonempty(),
                age: f.number().min(18),
                isActive: f.boolean(),
                birthDate: f.date()
            })

            const form = await createForm({
                id: 'test-form',
                schema,
                defaultValues: {
                    username: 'john',
                    age: 25,
                    isActive: true
                }
            })

            expect(form).toBeDefined()
            expect(form.id).toBe('test-form')
            expect(form.fields.length).toBe(4)

            const usernameField = form.getField('username') as any
            expect(usernameField).toBeDefined()
            expect(usernameField?.type || usernameField?.input?.type).toBe('text')
            expect(usernameField?.validationOptions || usernameField?.input?.validationOptions).toHaveProperty('required')
            expect(usernameField?.value || usernameField?.input?.value).toBe('john')

            const ageField = form.getField('age') as any
            expect(ageField?.type || ageField?.input?.type).toBe('number')
            expect(ageField?.value || ageField?.input?.value).toBe(25)

            const isActiveField = form.getField('isActive') as any
            expect(isActiveField?.type || isActiveField?.input?.type).toBe('checkbox')
            expect(isActiveField?.value || isActiveField?.input?.value).toBe(true)

            const birthDateField = form.getField('birthDate') as any
            expect(birthDateField?.type || birthDateField?.input?.type).toBe('date')
        })

        it('should execute submission strategies correctly', async () => {
            const schema = f.object({ email: f.string().email() })
            let submittedData = null
            
            const form = await createForm({
                schema,
                onSubmit: (data) => {
                    submittedData = data
                }
            })

            form.updateField('email', 'test@test.com')
            const result = await form.submit()

            expect(result).not.toBeNull()
            expect(submittedData).toEqual({ email: 'test@test.com' })
        })
    })
})
