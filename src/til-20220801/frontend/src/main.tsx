import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import embed, { VisualizationSpec } from 'vega-embed';

const HOST = 'http://localhost:8000';

const App = (): JSX.Element => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    getHello()
      .then((msg) => setMessage(msg))
      .catch((err) => console.log(err));
    getSimpleLineJson()
      .then((data) => embed('#vis', data))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [message]);

  return (
    <div>
      <h1>{message}</h1>
      <div id='vis'></div>
    </div>
  );
};

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(<App />);

async function getHello(): Promise<string> {
  const res = await fetch(HOST);
  if (!res.ok) return 'error';
  const data = await res.json();
  const message = data['message'];

  return message;
}

async function getSimpleLineJson(): Promise<VisualizationSpec> {
  const res = await fetch(HOST + '/simple-line');
  if (!res.ok) return {};
  const spec: VisualizationSpec = await res.json();

  return spec;
}
