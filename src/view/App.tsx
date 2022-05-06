import { CssBaseline } from '@mui/material'
import { createContext, FC, StrictMode } from 'react'

import { IAuthService } from '../api/auth-service'
import { AuthServiceFirebase } from '../api/auth-service-firebase'
import { InitFirebase } from '../api/init-firebase'
import { AppModelContext, createAppModel } from '../model/AppModel'
import AppBody from './AppBody'
import AppHeader from './AppHeader'
import ThemeContainer from './ThemeContainer'

const createAuthService: () => IAuthService = () => new AuthServiceFirebase()
export const AuthContext = createContext({} as ReturnType<typeof createAuthService>)

const App: FC = () => {
    new InitFirebase()

    return (
        <StrictMode>
            <ThemeContainer>
                <CssBaseline>
                    <AuthContext.Provider value={createAuthService()}>
                        <AppModelContext.Provider value={createAppModel()}>
                            <AppHeader></AppHeader>
                            <AppBody></AppBody>
                        </AppModelContext.Provider>
                    </AuthContext.Provider>
                </CssBaseline>
            </ThemeContainer>
        </StrictMode>
    )
}
export default App
