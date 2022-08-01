import React from 'react';
import { createRoot } from 'react-dom/client';

const App = (): JSX.Element => {
  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  );
};

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(<App />);

