import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

Sentry.init({
  dsn: "https://75c14c827bbd5f230936441b67b40e44@o4505861703729152.ingest.sentry.io/4506366278107136",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        /^https:\/\/nrdepartures\.deveroonie\.uk/,
        /^localhost/,
       // /^https:\/\/huxley2\.azurewebsites\.net/, doesnt like being traced by sentry
        /^https:\/\/nrdeparturesdelayapi\.cylic\.app/,
      ],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
