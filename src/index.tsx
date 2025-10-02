import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppSimple } from './App-simple';
import { App } from './App';
import { AppDebug } from './App-debug';
import { AppComponentTest } from './App-component-test';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <h1>🚨 Something went wrong</h1>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '10px', padding: '10px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);

// Try simple app first to test if React is working
const useSimpleApp = true; // Change to true for debugging

// Minimal test component
const MinimalTest = () => (
  <div style={{ 
    padding: '20px', 
    fontSize: '18px',
    backgroundColor: '#f0f0f0',
    border: '2px solid #007bff',
    margin: '20px'
  }}>
    <h1 style={{ color: '#007bff' }}>🎯 React Test</h1>
    <p>If you can see this, React is working!</p>
    <p>Current time: {new Date().toLocaleTimeString()}</p>
  </div>
);

try {
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  console.log('✅ Full Intelysia App rendered successfully');
} catch (error) {
  console.error('❌ Failed to render full app:', error);
  // Fallback to simple app
  try {
    root.render(<ErrorBoundary><AppSimple /></ErrorBoundary>);
  } catch (fallbackError) {
    root.render(<MinimalTest />);
  }
}