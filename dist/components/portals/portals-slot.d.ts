import { Interpolation, Theme } from '@emotion/react';
import { CSSProperties } from 'react';
export interface IPortalSlotProps {
    id: string;
    slotName: string;
    css?: Interpolation<Theme>;
    className?: string;
    styles?: CSSProperties;
    drawerContainerRef?: React.RefObject<HTMLDivElement>;
}
export declare const PortalSlot: ({ id, slotName, drawerContainerRef, css, className, styles }: IPortalSlotProps) => import("@emotion/react/jsx-runtime").JSX.Element;
