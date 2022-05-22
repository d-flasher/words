import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container'
import { createContext, FC, StrictMode, useState } from 'react'

import IApiAuth from '../api/api-auth'
import ApiAuthFirebase from '../api/api-auth-firebase'
import InitFirebase from '../api/init-firebase'
import AppHeader from './AppHeader'
import AuthManager from './AuthManager'
import ThemeContainer from './ThemeContainer'
import WordsApp from './WordsApp'

const createApiAuth: () => IApiAuth = () => new ApiAuthFirebase()
export const ApiAuthContext = createContext({} as ReturnType<typeof createApiAuth>)

const App: FC = () => {
    useState(() => new InitFirebase())
    const [apiAuth] = useState(() => createApiAuth())

    return (
        <StrictMode>
            <ThemeContainer>
                <CssBaseline>
                    <ApiAuthContext.Provider value={apiAuth}>
                        <AppHeader></AppHeader>
                        <AuthManager>
                            <Container maxWidth="sm">
                                <WordsApp></WordsApp>
                            </Container>
                        </AuthManager>
                    </ApiAuthContext.Provider>
                </CssBaseline>
            </ThemeContainer>
        </StrictMode>
    )
}
export default App
