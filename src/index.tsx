import './index.css'

import ReactDOM from 'react-dom'

import App from './view/App'

class Index {
    constructor() {
        ReactDOM.render(
            <App />,
            document.getElementById('root') as HTMLElement
        )
    }
}
new Index()
