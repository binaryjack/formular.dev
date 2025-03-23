import './index.css'

import ReactDOM from 'react-dom/client'

import App from './App'
import { AppContextProvider } from './components/context/appContext/AppContext'

document.title = import.meta.env.VITE_APP_NAME ?? ''
const rootComponent = document.getElementById('root')

const root = ReactDOM.createRoot(rootComponent!)
root.render(
    <AppContextProvider debug={{ color: 'yellow' }}>
        <App />
    </AppContextProvider>
)
