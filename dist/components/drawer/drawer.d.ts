import { ElementPositionOutputType } from '../../style/global.types';
interface IDrawerProps {
    id: string;
    children: React.ReactNode;
    position: ElementPositionOutputType;
    width?: string;
    height?: string;
}
export declare const Drawer: ({ id, children, position, width, height }: IDrawerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
