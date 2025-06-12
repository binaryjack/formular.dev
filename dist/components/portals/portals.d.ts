/**
 * Portal Component
 *
 * This component is used to render its children into a DOM node that exists outside the DOM hierarchy of the parent component.
 * It uses React's `createPortal` to achieve this functionality.
 *
 * Props:
 * - `id` (string): The unique identifier for the portal.
 * - `slotName` (string): The name of the slot where the portal will render its children.
 * - `children` (React.ReactNode): The content to be rendered inside the portal.
 *
 * Example Usage:
 * ```
 * <Portal id="example" slotName="header">
 *   <h1>This is rendered in the header slot</h1>
 * </Portal>
 * ```
 */
export interface IPortalProps {
    id: string;
    slotName: string;
    children?: React.ReactNode;
}
export declare const Portal: ({ id, slotName, children }: IPortalProps) => import("@emotion/react/jsx-runtime").JSX.Element;
