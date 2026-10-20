import React from 'react';
import './ErrorBoundary.css';

/**
 * Universal React Error Boundary
 * Prevents unhandled render errors from causing a blank white screen.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[Learning Space ErrorBoundary] Caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '#/';
  };

  render() {
    if (this.state.hasError) {
      const isThai =
        typeof document !== 'undefined' &&
        document.documentElement.lang === 'th';

      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <div className="error-boundary-icon">⚠️</div>
            <h2 className="error-boundary-title">
              {isThai
                ? 'เกิดข้อผิดพลาดในการแสดงผลหน้านี้'
                : 'An unexpected render error occurred'}
            </h2>
            <p className="error-boundary-desc">
              {isThai
                ? 'ระบบตรวจพบข้อผิดพลาดที่ไม่คาดคิดในคอมโพเนนต์นี้ แต่เราได้ป้องกันไม่ให้หน้าเว็บล่มทั้งหมด'
                : 'The application encountered an unexpected issue in this component view. You can return home or reload the page.'}
            </p>

            {this.state.error && (
              <details className="error-boundary-details">
                <summary>
                  {isThai ? 'ดูรายละเอียดข้อผิดพลาด (Technical Details)' : 'View Error Details'}
                </summary>
                <pre className="error-boundary-stack">
                  {this.state.error.toString()}
                  {'\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="error-boundary-actions">
              <button
                type="button"
                className="error-boundary-btn error-boundary-btn--primary"
                onClick={() => window.location.reload()}
              >
                🔄 {isThai ? 'โหลดหน้าใหม่ (Reload)' : 'Reload Page'}
              </button>
              <button
                type="button"
                className="error-boundary-btn error-boundary-btn--secondary"
                onClick={this.handleReset}
              >
                🏠 {isThai ? 'กลับหน้าแรก (Back to Home)' : 'Back to Home'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
