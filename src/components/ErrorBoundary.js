// src/components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="error-boundary text-center">
                <div className="error-icon mb-4">
                  <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: '4rem' }}></i>
                </div>
                <h2 className="mb-3">Oops! Something went wrong</h2>
                <p className="text-muted mb-4">
                  We're sorry, but something unexpected happened. Please try refreshing the page.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh Page
                  </button>
                  <a href="/" className="btn btn-outline-primary">
                    <i className="bi bi-house me-2"></i>
                    Go Home
                  </a>
                </div>
                
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-4 text-start">
                    <summary className="btn btn-link">Show Error Details</summary>
                    <pre className="bg-light p-3 rounded mt-2 text-start">
                      {this.state.error && this.state.error.toString()}
                      <br />
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;