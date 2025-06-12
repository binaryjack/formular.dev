import { default as React } from 'react';
interface LinkDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (url: string, text: string) => void;
    initialUrl?: string;
    initialText?: string;
}
export declare const LinkDialog: React.FC<LinkDialogProps>;
export {};
