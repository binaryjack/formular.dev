/**
 * Responsive Value Type
 *
 * Type for responsive values that can be single values or breakpoint-specific objects.
 */

export type ResponsiveValueType<T> = T | Partial<Record<string, T>>
