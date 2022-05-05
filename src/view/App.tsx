import { createContext, FC, StrictMode } from 'react'

import { IAuthService } from '../api/auth-service'
import { AuthServiceFirebase } from '../api/auth-service-firebase'
import { InitFirebase } from '../api/init-firebase'
import AppBody from './AppBody'
import AppHeader from './AppHeader'

const createAuthService: () => IAuthService = () => new AuthServiceFirebase()
export const AuthContext = createContext({} as ReturnType<typeof createAuthService>)

const App: FC = () => {
    new InitFirebase()

    return (
        <StrictMode>
            <AuthContext.Provider value={createAuthService()}>
                <AppHeader></AppHeader>
                <AppBody></AppBody>
            </AuthContext.Provider>
        </StrictMode>
    )
}
export default App
