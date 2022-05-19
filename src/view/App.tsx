import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container'
import { createContext, FC, StrictMode, useState } from 'react'

import IAuthService from '../api/auth-service'
import AuthServiceFirebase from '../api/auth-service-firebase'
import InitFirebase from '../api/init-firebase'
import AppHeader from './AppHeader'
import AuthManager from './AuthManager'
import ThemeContainer from './ThemeContainer'
import WordsApp from './WordsApp'

const createAuthService: () => IAuthService = () => new AuthServiceFirebase()
export const AuthContext = createContext({} as ReturnType<typeof createAuthService>)

const App: FC = () => {
    useState(() => new InitFirebase())
    const [authService] = useState(() => createAuthService())

    return (
        <StrictMode>
            <ThemeContainer>
                <CssBaseline>
                    <AuthContext.Provider value={authService}>
                        <AppHeader></AppHeader>
                        <AuthManager>
                            <Container maxWidth="sm">
                                <WordsApp></WordsApp>
                            </Container>
                        </AuthManager>
                    </AuthContext.Provider>
                </CssBaseline>
            </ThemeContainer>
        </StrictMode>
    )
}
export default App
