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
                    <div style={{ padding: '1rem', backgroundColor: '#f8d7da', color: '#721c24' }}>
                        <h2>Something went wrong.</h2>
                        {error && <p>Error: {error.message}</p>}
                        {errorInfo && (
                            <details style={{ whiteSpace: 'pre-wrap' }}>
                                {errorInfo.componentStack}
                            </details>
                        )}
                    </div>
                )
            )
        }

        return children
    }
}
