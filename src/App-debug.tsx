import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components we'll test one by one
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import HomePage from './pages/HomePage';

export function AppDebug() {
  const [step, setStep] = useState(1);
  
  const TestStep = ({ stepNum, title, children }: { stepNum: number, title: string, children: React.ReactNode }) => (
    <div style={{ 
      padding: '15px', 
      margin: '10px 0',
      border: step === stepNum ? '2px solid #2196f3' : '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: step === stepNum ? '#f0f8ff' : '#f9f9f9'
    }}>
      <h3>Step {stepNum}: {title}</h3>
      {step === stepNum && children}
    </div>
  );
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>🔧 Intelysia Debug Mode</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setStep(step > 1 ? step - 1 : 1)} disabled={step === 1}>← Previous</button>
        <span style={{ margin: '0 10px' }}>Step {step} of 5</span>
        <button onClick={() => setStep(step < 5 ? step + 1 : 5)} disabled={step === 5}>Next →</button>
      </div>
      
      <TestStep stepNum={1} title="Basic React Router">
        <Router>
          <div>
            ✅ Router working!
            <Routes>
              <Route path="*" element={<div>Route system working!</div>} />
            </Routes>
          </div>
        </Router>
      </TestStep>
      
      <TestStep stepNum={2} title="HelmetProvider">
        <HelmetProvider>
          <div>✅ HelmetProvider working!</div>
        </HelmetProvider>
      </TestStep>
      
      <TestStep stepNum={3} title="Combined Router + Helmet">
        <HelmetProvider>
          <Router>
            <div>✅ Router + Helmet working together!</div>
          </Router>
        </HelmetProvider>
      </TestStep>
      
      <TestStep stepNum={4} title="Basic Layout Structure">
        <HelmetProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <header style={{ background: '#2196f3', color: 'white', padding: '10px' }}>
                Header Placeholder
              </header>
              <main className="flex-grow">
                <Routes>
                  <Route path="*" element={<div style={{ padding: '20px' }}>Main Content Area Working!</div>} />
                </Routes>
              </main>
              <footer style={{ background: '#666', color: 'white', padding: '10px' }}>
                Footer Placeholder
              </footer>
            </div>
          </Router>
        </HelmetProvider>
      </TestStep>
      
      <TestStep stepNum={5} title="Full Test Result">
        <div style={{ 
          backgroundColor: '#d4edda', 
          padding: '15px', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          <h4>✅ All basic components working!</h4>
          <p>The issue is likely in one of the imported page components or layout components.</p>
          <ul>
            <li>✅ React Router DOM</li>
            <li>✅ React Helmet Async</li>
            <li>✅ Tailwind CSS classes</li>
            <li>✅ Basic app structure</li>
          </ul>
        </div>
      </TestStep>
      
      {step === 5 && (
        <button 
          onClick={() => console.log('Ready to test individual components')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginTop: '10px'
          }}
        >
          ✅ Continue to Component Testing
        </button>
      )}
    </div>
  );
}