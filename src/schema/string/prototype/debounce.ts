import type { IStringSchemaImpl } from '../string.types'

/**
 * Set debounce delay for this field
 * Configures per-field debounce timing for UI updates
 *
 * @param milliseconds - Debounce delay in milliseconds
 * @returns The schema instance for method chaining
 *
 * @example
 * ```typescript
 * const schema = f.string().min(3).debounce(200)
 * // Field will debounce updates at 200ms instead of global default
 * ```
 */
export function debounce(this: IStringSchemaImpl, milliseconds: number): IStringSchemaImpl {
    this._debounce = milliseconds
    return this
}
