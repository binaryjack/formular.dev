/**
 * Component State Interface
 *
 * Interface defining state properties for interactive components.
 */

export interface IComponentState {
    /** Whether the component is focused */
    focused: boolean
    /** Whether the component is hovered */
    hovered: boolean
    /** Whether the component is pressed/active */
    pressed: boolean
    /** Whether the component is disabled */
    disabled: boolean
    /** Whether the component is in an error state */
    error: boolean
    /** Whether the component is loading */
    loading: boolean
}
