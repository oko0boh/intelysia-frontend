import React from 'react';

export function AppSimple() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎯 Intelysia Frontend Test</h1>
      <p>If you can see this, React is working correctly!</p>
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        border: '1px solid #2196f3',
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        <h2>✅ Test Results:</h2>
        <ul>
          <li>✅ React is rendering</li>
          <li>✅ TypeScript is compiled</li>
          <li>✅ Vite build system is working</li>
        </ul>
      </div>
      
      <div style={{ 
        backgroundColor: '#fff3cd', 
        padding: '15px', 
        border: '1px solid #ffeaa7',
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        <h3>⚠️ Status:</h3>
        <p>The full Intelysia app has an error. The error boundary caught it and showed this fallback instead.</p>
        <p>This is good - it means React is working and we can debug the specific component issue.</p>
      </div>
    </div>
  );
}