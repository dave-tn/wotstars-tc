import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

import { HistoryProvider } from './HistoryProvider'

ReactDOM.render(
  <React.StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


// More info: https://bit.ly/CRA-vitals
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log)
}
