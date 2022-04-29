import Button from '@mui/material/Button'
import { FC, useState } from 'react'

import { IUser } from '../api/auth-service'
import { useNotNullContext } from '../utils/common-types'
import { AuthContext } from './App'
import AuthForm from './AuthForm'

const AppBody: FC = () => {
    const [user, setUser] = useState<IUser | null | undefined>(undefined)
    const authService = useNotNullContext(AuthContext)

    authService.onAuthStateChanged(user => {
        setUser(user)
    })

    if (user === undefined) return <p>Loading...</p>
    if (user === null) return <AuthForm></AuthForm>
    return (
        <Button
            variant="contained"
            onClick={() => authService.signOut()}
        >
            Sign out
        </Button>
    )
}
export default AppBody
