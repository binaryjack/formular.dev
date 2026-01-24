/**
 * Validator preset registry
 * Pre-built validation schemas for common form patterns
 */

import { f } from './builder'
import type { IValidatorPreset, IValidatorPresetRegistry } from './types'

/**
 * Preset registry implementation
 */
export const ValidatorPresetRegistry = function (this: IValidatorPresetRegistryImpl): void {
    this._presets = new Map()
} as unknown as {
    new (): IValidatorPresetRegistryImpl
    prototype: IValidatorPresetRegistry
}

interface IValidatorPresetRegistryImpl extends IValidatorPresetRegistry {
    _presets: Map<string, IValidatorPreset>
}

ValidatorPresetRegistry.prototype.register = function (
    this: IValidatorPresetRegistryImpl,
    preset: IValidatorPreset
): void {
    this._presets.set(preset.name, preset)
}

ValidatorPresetRegistry.prototype.get = function (
    this: IValidatorPresetRegistryImpl,
    name: string
): IValidatorPreset | undefined {
    return this._presets.get(name)
}

ValidatorPresetRegistry.prototype.list = function (
    this: IValidatorPresetRegistryImpl
): IValidatorPreset[] {
    return Array.from(this._presets.values())
}

ValidatorPresetRegistry.prototype.has = function (
    this: IValidatorPresetRegistryImpl,
    name: string
): boolean {
    return this._presets.has(name)
}

/**
 * Global preset registry instance
 */
export const presetRegistry = new ValidatorPresetRegistry()

/**
 * Built-in presets
 */

// Login form preset
presetRegistry.register({
    name: 'login',
    description: 'Standard login form with email and password',
    schema: f.object({
        email: f.string().email().nonempty(),
        password: f.string().min(8).nonempty(),
        rememberMe: f.boolean().optional()
    }),
    fields: {}
})

// Signup form preset
presetRegistry.register({
    name: 'signup',
    description: 'User registration form',
    schema: f.object({
        name: f.string().min(2).max(100).nonempty(),
        email: f.string().email().nonempty(),
        password: f.string().min(8).max(128).nonempty(),
        confirmPassword: f.string().nonempty(),
        acceptTerms: f.boolean().refine((val) => val === true, { message: 'You must accept terms' })
    }),
    fields: {}
})

// Contact form preset
presetRegistry.register({
    name: 'contact',
    description: 'Contact form with name, email, and message',
    schema: f.object({
        name: f.string().min(2).max(100).nonempty(),
        email: f.string().email().nonempty(),
        subject: f.string().min(3).max(200).optional(),
        message: f.string().min(10).max(2000).nonempty()
    }),
    fields: {}
})

// Profile form preset
presetRegistry.register({
    name: 'profile',
    description: 'User profile form',
    schema: f.object({
        firstName: f.string().min(2).max(50).nonempty(),
        lastName: f.string().min(2).max(50).nonempty(),
        email: f.string().email().nonempty(),
        phone: f.string().optional(),
        bio: f.string().max(500).optional(),
        avatar: f.string().url().optional()
    }),
    fields: {}
})

// Address form preset
presetRegistry.register({
    name: 'address',
    description: 'Address form with international support',
    schema: f.object({
        street: f.string().min(3).max(200).nonempty(),
        city: f.string().min(2).max(100).nonempty(),
        postalCode: f.string().nonempty(),
        country: f.enum(['US', 'UK', 'FR', 'DE', 'CH', 'IT', 'ES', 'CA', 'AU', 'JP'])
    }),
    fields: {}
})

// Payment form preset
presetRegistry.register({
    name: 'payment',
    description: 'Payment information form',
    schema: f.object({
        cardNumber: f
            .string()
            .pattern(/^\d{16}$/, 'Invalid card number')
            .nonempty(),
        cardHolder: f.string().min(3).max(100).nonempty(),
        expiryMonth: f.number().int().min(1).max(12),
        expiryYear: f.number().int().min(new Date().getFullYear()),
        cvv: f
            .string()
            .pattern(/^\d{3,4}$/, 'Invalid CVV')
            .nonempty()
    }),
    fields: {}
})

// Swiss specific form preset
presetRegistry.register({
    name: 'swiss-user',
    description: 'Swiss user form with AHV and phone validation',
    schema: f.object({
        firstName: f.string().min(2).max(50).nonempty(),
        lastName: f.string().min(2).max(50).nonempty(),
        email: f.string().email().nonempty(),
        phone: f.string().phone('CH'),
        postalCode: f.string().postalCode('CH'),
        ahv: f.string().ahv()
    }),
    fields: {}
})

// Newsletter subscription preset
presetRegistry.register({
    name: 'newsletter',
    description: 'Newsletter subscription form',
    schema: f.object({
        email: f.string().email().nonempty(),
        preferences: f.array(f.enum(['weekly', 'monthly', 'announcements'])).optional()
    }),
    fields: {}
})

// Search form preset
presetRegistry.register({
    name: 'search',
    description: 'Search form with filters',
    schema: f.object({
        query: f.string().min(2).max(200).nonempty(),
        category: f.string().optional(),
        sortBy: f.enum(['relevance', 'date', 'popular']).optional(),
        dateFrom: f.date().optional(),
        dateTo: f.date().optional()
    }),
    fields: {}
})
