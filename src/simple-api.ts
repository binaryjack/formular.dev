/**
 * Simple form creation API
 * Clean, type-safe form creation without IoC ceremony
 */

import type { IFormular } from './core/formular-engine/formular-base/formular-base.types'
import { InputTypeNames } from './core/framework/common/common.input.types'
import type { IFieldDescriptor } from './core/framework/schema/descriptor/field.descriptor'
import type { IFormularManager } from './core/managers/formular-manager/formular-manager.types'
import { SFormularManager } from './core/managers/formular-manager/formular-manager.types'
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

            // Determine input type from schema
            let inputType: InputTypeNames = 'text'

            // Try to infer type from schema prototype
            const protoName = Object.getPrototypeOf(fieldSchema).constructor.name
            if (protoName === 'NumberSchema') {
                inputType = 'number'
            } else if (protoName === 'BooleanSchema') {
                inputType = 'checkbox'
            } else if (protoName === 'DateSchema') {
                inputType = 'date'
            } else if (protoName === 'StringSchema') {
                inputType = 'text'
            }

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
                validationOptions: {},
                options: [],
                isValid: false,
                isDirty: false,
                isPristine: true,
                isFocus: false,
                shouldValidate: true
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
export function createForm<T extends IObjectShape>(
    config: IFormConfig<T>
): IFormular<IInferShape<T>> {
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
    const form = formularManager.createFromDescriptors<IInferShape<T>>(formId, descriptors)

    if (!form) {
        throw new Error('Failed to create form')
    }

    // Setup submission strategy
    if (config.onSubmit) {
        const strategy = config.submissionStrategy ?? new DirectSubmissionStrategy(config.onSubmit)

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
export function createFormFromPreset<T extends IObjectShape>(
    presetName: string,
    config?: Omit<IFormConfig<T>, 'schema'>
): IFormular<IInferShape<T>> {
    const { presetRegistry } = require('./schema/presets')
    const preset = presetRegistry.get(presetName)

    if (!preset) {
        throw new Error(`Preset "${presetName}" not found`)
    }

    return createForm({
        ...config,
        schema: preset.schema
    } as IFormConfig<T>)
}
