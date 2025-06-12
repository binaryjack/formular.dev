import { IFormatManager } from '../format-manager.types';
export interface IRelatives {
    id: number;
    parent: ParentNode;
    child: Node;
}
export declare const addRelatives: (list: IRelatives[], parent: ParentNode, child: Node) => void;
export declare const removeFormatting: (this: IFormatManager, formatType: string) => void;
