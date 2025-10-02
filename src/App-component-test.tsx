import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Test components one by one
let Header: React.ComponentType = () => <div>Header placeholder</div>;
let Footer: React.ComponentType = () => <div>Footer placeholder</div>;
let HomePage: React.ComponentType = () => <div>HomePage placeholder</div>;

// Dynamically import components to catch errors
const loadComponent = async (componentName: string) => {
  try {
    switch (componentName) {
      case 'Header':
        const headerModule = await import('./components/layout/Header');
        Header = headerModule.default;
        return 'Header loaded successfully!';
      case 'Footer':
        const footerModule = await import('./components/layout/Footer');
        Footer = footerModule.default;
        return 'Footer loaded successfully!';
      case 'HomePage':
        const homeModule = await import('./pages/HomePage');
        HomePage = homeModule.default;
        return 'HomePage loaded successfully!';
      default:
        return 'Unknown component';
    }
  } catch (error) {
    return `Error loading ${componentName}: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export function AppComponentTest() {
  const [currentTest, setCurrentTest] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const tests = [
    { name: 'Header', component: 'Header' },
    { name: 'Footer', component: 'Footer' }, 
    { name: 'HomePage', component: 'HomePage' },
  ];

  const runTest = async (testIndex: number) => {
    if (testIndex >= tests.length) return;
    
    setLoading(true);
    setCurrentTest(testIndex);
    
    const test = tests[testIndex];
    const result = await loadComponent(test.component);
    
    setResults(prev => [...prev, `${test.name}: ${result}`]);
    setLoading(false);
    
    // Auto-advance to next test if successful
    if (result.includes('successfully')) {
      setTimeout(() => setCurrentTest(testIndex + 1), 1000);
    }
  };

  const TestUI = ({ testIndex }: { testIndex: number }) => {
    if (testIndex >= tests.length) {
      return (
        <div style={{ 
          backgroundColor: '#d4edda', 
          padding: '20px', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          margin: '10px 0'
        }}>
          <h3>🎉 All Components Tested!</h3>
          <p>Now let's try rendering the full app with working components:</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px'
            }}
          >
            Try Full App
          </button>
        </div>
      );
    }

    return (
      <div style={{ margin: '10px 0' }}>
        <h3>Testing: {tests[testIndex].name}</h3>
        <button 
          onClick={() => runTest(testIndex)}
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: loading ? '#6c757d' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px'
          }}
        >
          {loading ? 'Loading...' : `Test ${tests[testIndex].name}`}
        </button>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧪 Component Testing Mode</h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h3>Test Results:</h3>
        {results.length === 0 ? (
          <p>No tests run yet. Click the test buttons below.</p>
        ) : (
          <ul>
            {results.map((result, index) => (
              <li key={index} style={{ 
                color: result.includes('Error') ? '#dc3545' : '#28a745',
                marginBottom: '5px'
              }}>
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>

      <TestUI testIndex={currentTest} />

      {currentTest < tests.length && (
        <div style={{ marginTop: '20px' }}>
          <h4>Progress: {currentTest + 1} / {tests.length}</h4>
          <div style={{ 
            width: '100%', 
            height: '10px', 
            backgroundColor: '#e9ecef',
            borderRadius: '5px'
          }}>
            <div style={{ 
              width: `${((currentTest + 1) / tests.length) * 100}%`,
              height: '100%',
              backgroundColor: '#28a745',
              borderRadius: '5px',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      )}

      {/* Test render area */}
      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        border: '2px dashed #ccc',
        borderRadius: '4px',
        minHeight: '200px'
      }}>
        <h4>Component Render Test:</h4>
        <HelmetProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </HelmetProvider>
      </div>
    </div>
  );
}