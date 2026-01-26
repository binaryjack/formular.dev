import type { INumberSchemaImpl } from '../number.types'

/**
 * Set debounce delay for this field
 * Configures per-field debounce timing for UI updates
 *
 * @param milliseconds - Debounce delay in milliseconds
 * @returns The schema instance for method chaining
 *
 * @example
 * ```typescript
 * const schema = f.number().min(0).max(100).debounce(300)
 * // Field will debounce updates at 300ms instead of global default
 * ```
 */
export function debounce(this: INumberSchemaImpl, milliseconds: number): INumberSchemaImpl {
    this._debounce = milliseconds
    return this
}
