export type ChildrenAppendingStatusType = 'hasChilds' | 'hasNoChilds';
export declare const useTriggerOnAddOrRemoveChildren: <T extends HTMLElement>() => {
    trigger: ChildrenAppendingStatusType;
    elementRef: import('react').RefObject<T>;
};
