import { ElementPositionOutputType } from '../../../style/global.types';
interface DrawerSlotProps {
    id: string;
    slotName: string;
    opensToThe: ElementPositionOutputType;
    conditionalShow?: boolean;
}
export declare const DrawerSlot: ({ id, slotName, opensToThe, conditionalShow }: DrawerSlotProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
