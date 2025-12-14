import { cx } from 'formular.design.system'
import React, { Component, ReactNode } from 'react'

interface BoundaryErrorCatcherProps {
    children: ReactNode
    fallback?: ReactNode // Optional custom fallback UI
}

interface BoundaryErrorCatcherState {
    hasError: boolean
    error: Error | null
    errorInfo: React.ErrorInfo | null
}

export class BoundaryErrorCatcher extends Component<
    BoundaryErrorCatcherProps,
    BoundaryErrorCatcherState
> {
    constructor(props: BoundaryErrorCatcherProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }

    static getDerivedStateFromError(error: Error): BoundaryErrorCatcherState {
        // Update state to render fallback UI
        return { hasError: true, error, errorInfo: null }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Log error details (could be sent to a monitoring service)
        console.error('BoundaryErrorCatcher caught an error:', error, errorInfo)
        this.setState({ errorInfo })
    }

    render(): ReactNode {
        const { hasError, error, errorInfo } = this.state
        const { children, fallback } = this.props

        if (hasError) {
            // Render fallback UI if provided, otherwise show a default message
            return (
                fallback ?? (
                    <div
                        className={cx(
                            'p-4 bg-red-50 border border-red-200 rounded-md text-red-800'
                        )}
                    >
                        <h2 className="text-lg font-semibold mb-2">Something went wrong.</h2>
                        {error && <p className="text-sm mb-2">Error: {error.message}</p>}
                        {errorInfo && (
                            <details className="text-xs whitespace-pre-wrap">
                                <summary className="cursor-pointer font-medium">
                                    Error Details
                                </summary>
                                <div className="mt-2 p-2 bg-red-100 rounded border">
                                    {errorInfo.componentStack}
                                </div>
                            </details>
                        )}
                    </div>
                )
            )
        }

        return children
    }
}
