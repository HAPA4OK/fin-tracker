import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'


function  Main() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)


