import Container from '@mui/material/Container'
import { FC, useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { IUser } from '../api/auth-service'
import { AuthContext } from './App'
import AppRoutes from './AppRoutes'
import AuthForm from './AuthForm'

const AppBody: FC = () => {
    const [user, setUser] = useState<IUser | null | undefined>(undefined)
    const authService = useContext(AuthContext)

    useEffect(() => {
        return authService.onAuthStateChanged(user => {
            setUser(user)
        })
    })

    if (user === undefined) return <p>Loading...</p>
    if (user === null) return <AuthForm></AuthForm>

    return (
        <Container maxWidth="sm">
            <BrowserRouter>
                <AppRoutes></AppRoutes>
            </BrowserRouter>
        </Container>
    )
}
export default AppBody
