import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container'
import { createContext, FC, StrictMode } from 'react'

import IAuthService from '../api/auth-service'
import AuthServiceFirebase from '../api/auth-service-firebase'
import InitFirebase from '../api/init-firebase'
import AppModel from '../model/app-model'
import AppHeader from './AppHeader'
import AuthManager from './AuthManager'
import ThemeContainer from './ThemeContainer'

const createAuthService: () => IAuthService = () => new AuthServiceFirebase()
export const AuthContext = createContext({} as ReturnType<typeof createAuthService>)

const createAppModel = () => new AppModel()
export const AppModelContext = createContext({} as ReturnType<typeof createAppModel>)

const App: FC = () => {
    new InitFirebase()

    return (
        <StrictMode>
            <ThemeContainer>
                <CssBaseline>
                    <AuthContext.Provider value={createAuthService()}>
                        <AppModelContext.Provider value={createAppModel()}>
                            <AppHeader></AppHeader>
                            <AuthManager>
                                <Container maxWidth="sm">
                                    Words app
                                </Container>
                            </AuthManager>
                        </AppModelContext.Provider>
                    </AuthContext.Provider>
                </CssBaseline>
            </ThemeContainer>
        </StrictMode>
    )
}
export default App
