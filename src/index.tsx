import ReactDOM from 'react-dom/client'

import App from './App'

document.title = import.meta.env.VITE_APP_NAME ?? ''
const rootComponent = document.getElementById('root')

const root = ReactDOM.createRoot(rootComponent!)
root.render(<App />)
