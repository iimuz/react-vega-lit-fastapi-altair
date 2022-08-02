import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Hello } from './hello';
import { SimpleLineJson } from './simple-line-json';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/message'} element={<Hello />} />
        <Route path={'/simple-line-json'} element={<SimpleLineJson />} />
      </Routes>
    </BrowserRouter>
  );
};

const Home = (): JSX.Element => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/message'>Message</Link>: バックエンドに接続して文字列取得できるか確認。
        </li>
        <li>
          <Link to='/simple-line-json'>Simple line json</Link>: バックエンドのAltairでjson出力してvega-embedで描画。
        </li>
      </ul>
    </div>
  );
};

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(<App />);
