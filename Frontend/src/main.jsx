import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('React app loading...')

window.onerror = function(msg, url, line, col, error) {
  console.error('JS Error:', msg, 'at line', line)
  document.body.innerHTML = '<div style="padding:50px;text-align:center"><h1 style="color:red">Error</h1><p>'+msg+'</p></div>'
}

const root = document.getElementById('root')
if (!root) {
  document.body.innerHTML = '<div style="padding:50px;text-align:center"><h1>Root not found</h1></div>'
} else {
  console.log('Rendering app...')
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
