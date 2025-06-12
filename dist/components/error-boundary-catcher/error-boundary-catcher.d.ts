import { default as React, Component, ReactNode } from 'react';
interface BoundaryErrorCatcherProps {
    children: ReactNode;
    fallback?: ReactNode;
}
interface BoundaryErrorCatcherState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}
export declare class BoundaryErrorCatcher extends Component<BoundaryErrorCatcherProps, BoundaryErrorCatcherState> {
    constructor(props: BoundaryErrorCatcherProps);
    static getDerivedStateFromError(error: Error): BoundaryErrorCatcherState;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): ReactNode;
}
export {};
