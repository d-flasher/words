import './index.css'

import ReactDOM from 'react-dom/client'

import App from './view/App'

class Index {
    constructor() {
        const root = ReactDOM.createRoot(
            document.getElementById('root') as HTMLElement
        )
        root.render(<App />)
    }
}
new Index()
