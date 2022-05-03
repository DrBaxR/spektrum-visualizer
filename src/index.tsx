import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { getData } from './getData';

getData().then(data => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <div></div>
      <App data={data} />
    </React.StrictMode>
  );
}); 
