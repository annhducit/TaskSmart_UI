/**
 * @description Overide the default ReactDom.render with ReactDom.createRoot
 * @author Duc Nguyen
 */
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'

if (import.meta.env.NODE_ENV === 'production') {
  console.log = () => {};
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
  

