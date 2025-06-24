/**
 * Commands Interface
 *
 * Generic interface for command configurations.
 * TButtonVariant should be a button variant type that contains styling properties.
 */
export interface ICommands<TButtonVariant = Record<string, any>> {
    basic: Partial<TButtonVariant>
    submit: Partial<TButtonVariant>
}
