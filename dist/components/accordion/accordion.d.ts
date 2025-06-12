import { ToggleableStateType } from '../../core/framework/common/common.toggleable';
export interface IAccordionProps {
    id: string;
    children?: React.ReactNode;
    initialState?: ToggleableStateType;
    title: string;
}
export declare const Accordion: ({ id, title, children, initialState }: IAccordionProps) => import("@emotion/react/jsx-runtime").JSX.Element;
