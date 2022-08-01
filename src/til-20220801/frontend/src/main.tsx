import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = (): JSX.Element => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    getHello()
      .then((msg) => setMessage(msg))
      .catch((err) => console.log(err));
  }, [message]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(<App />);

async function getHello(): Promise<string> {
  const res = await fetch('http://localhost:8000/');
  if (!res.ok) return 'error';
  const data = await res.json();
  const message = data['message'];

  return message;
}
