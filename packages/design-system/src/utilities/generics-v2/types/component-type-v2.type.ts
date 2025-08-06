/**
 * Component types for V2 Generic Style System
 *
 * Starting with core components and expanding to commonly used ones:
 * - button: Complex component (visual variants + colors + sizes)
 * - typography: Text-only component (validates text system)
 * - input: Mixed component (validates component + text styling)
 * - card: Container component (layout and styling)
 * - accordion: Expandable container component
 * - modal: Overlay component
 * - badge: Small indicator component
 * - chip: Interactive tag component
 */
export type ComponentTypeV2 =
    | 'button'
    | 'typography'
    | 'input'
    | 'card'
    | 'accordion'
    | 'modal'
    | 'badge'
    | 'chip'
