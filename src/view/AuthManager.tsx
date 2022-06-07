import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { FC, useContext, useEffect, useState } from 'react'

import { IUser } from '../api/api-auth'
import { ApiAuthContext } from './App'
import AuthForm from './AuthForm'

const AuthManager: FC = ({ children }) => {
    const [user, setUser] = useState<IUser | null | undefined>(undefined)
    const authService = useContext(ApiAuthContext)

    useEffect(() => {
        return authService.onAuthStateChanged(user => {
            setUser(user)
        })
    }, [authService])

    if (user === undefined) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
            <CircularProgress />
        </Box>
    )

    if (user === null) return <AuthForm></AuthForm>
    return (
        <div data-testid="auth-children">
            {children}
        </div>
    )
}
export default AuthManager
