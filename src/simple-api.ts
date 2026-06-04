/**
 * Simple form creation API
 * Clean, type-safe form creation without IoC ceremony
 */

import type { IFormular } from './core/formular-engine/formular-base/formular-base.types'
import type { InputTypeNames } from './core/framework/common/common.input.types'
import type { IFieldDescriptor } from './core/framework/schema/descriptor/field.descriptor'
import type { IFormularManager } from './core/managers/formular-manager/formular-manager.types'
import { SFormularManager } from './core/managers/formular-manager/formular-manager.types'
import { presetRegistry } from './schema/presets'
import type { IInferShape, IObjectSchema, IObjectShape } from './schema/types'
import { SetupHelpers } from './setup/core/setup-helpers'
import type { IFormSubmissionStrategy } from './submission-strategy'
import { DirectSubmissionStrategy } from './submission-strategy'

/**
 * Form configuration
 */
export interface IFormConfig<T extends IObjectShape> {
    /**
     * Form schema (required)
     */
    readonly schema: IObjectSchema<T>

    /**
     * Form ID (optional, auto-generated if not provided)
     */
    readonly id?: string

    /**
     * Default values (optional)
     */
    readonly defaultValues?: Partial<IInferShape<T>>

    /**
     * Submission handler (optional)
     */
    readonly onSubmit?: (data: IInferShape<T>) => void | Promise<void>

    /**
     * Success handler (optional)
     */
    readonly onSuccess?: (response: unknown, data: IInferShape<T>) => void

    /**
     * Error handler (optional)
     */
    readonly onError?: (error: Error) => void

    /**
     * Submission strategy (optional, defaults to direct)
     */
    readonly submissionStrategy?: IFormSubmissionStrategy<IInferShape<T>>
}

function inferInputType(fieldSchema: unknown): InputTypeNames {
    const fs = fieldSchema as any
    if (!fs) return 'text'
    
    if (fs._type === 'number' || typeof fs.int === 'function' || typeof fs.finite === 'function') return 'number'
    if (fs._type === 'boolean' || typeof fs.true === 'function' || typeof fs.false === 'function') return 'checkbox'
    if (fs._type === 'date') return 'date'
    
    // For date, since it only has min/max like number/string, if it lacks string/number specific methods, it's a date
    if (typeof fs.toLowerCase !== 'function' && typeof fs.int !== 'function' && typeof fs.true !== 'function' && typeof fs.min === 'function') {
        // Only String, Number, Date have min(). String has toLowerCase(), Number has int().
        return 'date'
    }
    
    return 'text'
}

/**
 * Extracts validation constraints from schema objects and normalizes them for the field engine.
 */
function extractValidationOptions(fieldSchema: unknown, key: string | number | symbol): Record<string, unknown> {
    const fs = fieldSchema as any
    const validationOptions: Record<string, unknown> = {}
    if (!fs) return validationOptions

    const err = (msg: string) => ({ message: msg, code: 'schema', name: String(key) })
    
    if (fs._required) {
        validationOptions['required'] = { value: fs._required.value, error: err(fs._required.message) }
    }
    if (fs._min) {
        validationOptions['minLength'] = { value: fs._min.value, error: err(fs._min.message) }
    }
    if (fs._max) {
        validationOptions['maxLength'] = { value: fs._max.value, error: err(fs._max.message) }
    }
    if (fs._email) {
        validationOptions['pattern'] = { value: fs._email.value, error: err(fs._email.message) }
    }

    return validationOptions
}

/**
 * Schema to field descriptor converter
 */
function schemaToDescriptors<T extends IObjectShape>(
    schema: IObjectSchema<T>,
    defaultValues?: Partial<IInferShape<T>>
): IFieldDescriptor[] {
    const descriptors: IFieldDescriptor[] = []
    let id = 1

    for (const key in schema.shape) {
        if (Object.prototype.hasOwnProperty.call(schema.shape, key)) {
            const fieldSchema = schema.shape[key]
            const defaultValue = defaultValues?.[key as keyof typeof defaultValues]

            const inputType = inferInputType(fieldSchema)
            const validationOptions = extractValidationOptions(fieldSchema, key)
            const debounceDelay = (fieldSchema as any)._debounce

            descriptors.push({
                id,
                name: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                type: inputType,
                value: defaultValue ?? '',
                objectValue: null,
                defaultValue: defaultValue ?? '',
                errors: [],
                guides: [],
                validationOptions,
                options: [],
                isValid: false,
                isDirty: false,
                isPristine: true,
                isFocus: false,
                shouldValidate: true,
                debounceDelay
            })

            id++
        }
    }

    return descriptors
}

/**
 * Create a form from schema
 *
 * @example
 * ```typescript
 * import { createForm, f } from 'formular.dev'
 *
 * const userSchema = f.object({
 *   email: f.string().email().nonempty(),
 *   age: f.number().min(18).max(100)
 * })
 *
 * const form = createForm({
 *   schema: userSchema,
 *   onSubmit: async (data) => {
 *     await api.post('/users', data)
 *   }
 * })
 * ```
 */
export async function createForm<T extends IObjectShape>(
    config: IFormConfig<T>
): Promise<IFormular<IInferShape<T>>> {
    // Create service manager (hidden from user)
    const serviceManager = SetupHelpers.forFormApplication()
    const formularManager = serviceManager.resolve<IFormularManager>(SFormularManager)

    if (!formularManager) {
        throw new Error('Failed to initialize form manager')
    }

    // Generate form ID
    const formId = config.id ?? `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Convert schema to descriptors
    const descriptors = schemaToDescriptors(config.schema, config.defaultValues)

    // Create form
    const form = await formularManager.createFromDescriptors<IInferShape<T>>(formId, descriptors)

    if (!form) {
        throw new Error('Failed to create form')
    }

    // Add explicit cleanup method to ensure proper DI container disposal
    ;(form as any).destroy = (): void => {
        console.log(`[FORMULAR] Destroying form ${formId} and cleaning up ServiceManager`)
        try {
            // Dispose the entire service manager and its dependencies
            serviceManager.dispose?.()
        } catch (error) {
            console.warn(`[FORMULAR] Error during form cleanup:`, error)
        }
    }

    // Setup submission strategy
    if (config.onSubmit) {
        const wrappedSubmit = async (data: IInferShape<T>): Promise<unknown> => {
            await config.onSubmit!(data)
            return undefined
        }
        const strategy = config.submissionStrategy ?? new DirectSubmissionStrategy(wrappedSubmit)

        // Override submit method
        const originalSubmit = form.submit.bind(form)
        form.submit = async (): Promise<IInferShape<T> | null> => {
            try {
                // Validate first
                const result = await originalSubmit()
                if (!result) {
                    return null
                }

                // Submit through strategy
                const response = await strategy.submit(result, form as IFormular<IInferShape<T>>)

                // Call success handler
                if (config.onSuccess) {
                    config.onSuccess(response, result)
                }

                return result
            } catch (error) {
                // Call error handler
                if (config.onError) {
                    config.onError(error as Error)
                }
                throw error
            }
        }
    }

    return form
}

/**
 * Create a form from preset
 *
 * @example
 * ```typescript
 * import { createFormFromPreset } from 'formular.dev'
 *
 * const loginForm = createFormFromPreset('login', {
 *   onSubmit: async (data) => {
 *     await api.login(data)
 *   }
 * })
 * ```
 */
export async function createFormFromPreset<T extends IObjectShape>(
    presetName: string,
    config?: Omit<IFormConfig<T>, 'schema'>
): Promise<IFormular<IInferShape<T>>> {
    const preset = presetRegistry.get(presetName)

    if (!preset) {
        throw new Error(`Preset "${presetName}" not found`)
    }

    return createForm({
        ...config,
        schema: preset.schema
    } as IFormConfig<T>)
}
