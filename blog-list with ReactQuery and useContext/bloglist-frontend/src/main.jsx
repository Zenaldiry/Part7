import ReactDOM from 'react-dom/client'
import App from './App'
import AppProvider from './providers/AppProvider'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Router>  
      <App />
    </Router>
  </AppProvider>
)
