export interface IIfClass {
    classN: string;
    addIf?: boolean;
}
export declare const newIFClass: (classN: string, addIf?: boolean) => {
    classN: string;
    addIf: boolean | undefined;
};
export declare const ifClass: (classes: IIfClass[]) => string;
