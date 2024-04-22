import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
// import 'ka-table/style.css';
// import 'antd/dist/antd.css'

if (import.meta.hot) {
  import.meta.hot.accept();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
