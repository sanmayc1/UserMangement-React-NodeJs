import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store ,persistor }from './Store/reduxStore.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router>
    <App />
    </Router>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
