import React from 'react';
import { Button, Result } from 'antd';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Result
                        status="error"
                        title="Something went wrong"
                        subTitle="An unexpected error occurred. Please try refreshing the page."
                        extra={[
                            <Button type="primary" key="reload" onClick={() => window.location.reload()}>
                                Refresh Page
                            </Button>,
                            <Button key="home" onClick={() => { window.location.href = '/'; }}>
                                Go Home
                            </Button>,
                        ]}
                    />
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
