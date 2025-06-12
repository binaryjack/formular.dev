import { ToggleableStateType } from '../../core/framework/common/common.toggleable';
export interface IAccordionContainerProps {
    id: string;
    title: string;
    children: React.ReactNode;
    initialState?: ToggleableStateType;
}
export declare const AccordionContainer: ({ id, title, children, initialState }: IAccordionContainerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
