import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// StrictMode is intentionally omitted: this app is animation/WebGL-heavy
// and StrictMode's double-invoke of effects churns the R3F context and
// re-runs intro timers in development. Production behaviour is identical.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
