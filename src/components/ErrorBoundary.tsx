import React, { Component, ErrorInfo } from 'react';
import { LoggingService } from '../services/LoggingService';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    private logger = LoggingService.getInstance();

    state: State = {
        hasError: false
    };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.logger.logError(error, {
            componentStack: errorInfo.componentStack
        });
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="error-container">
                    <h2>Something went wrong</h2>
                    <button onClick={() => window.location.reload()}>
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
