import { FC, StrictMode } from 'react'

import { InitFirebase } from '../api/init-firebase'

const App: FC = () => {
    new InitFirebase()

    return (
        <StrictMode>
            <div>Word app</div>
        </StrictMode>
    )
}
export default App
