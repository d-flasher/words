import { FC, useContext, useEffect, useState } from 'react'

import { IUser } from '../api/auth-service'
import { AuthContext } from './App'
import AuthForm from './AuthForm'

const AuthManager: FC = ({ children }) => {
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
        <div data-testid="auth-children">
            {children}
        </div>
    )
}
export default AuthManager
