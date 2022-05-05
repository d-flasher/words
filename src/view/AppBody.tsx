import { FC, useEffect, useState } from 'react'

import { IUser } from '../api/auth-service'
import { useNotNullContext } from '../utils/common-types'
import { AuthContext } from './App'
import AuthForm from './AuthForm'

const AppBody: FC = () => {
    const [user, setUser] = useState<IUser | null | undefined>(undefined)
    const authService = useNotNullContext(AuthContext)

    useEffect(() => {
        return authService.onAuthStateChanged(user => {
            setUser(user)
        })
    })

    if (user === undefined) return <p>Loading...</p>
    if (user === null) return <AuthForm></AuthForm>
    return (
        <div></div>
    )
}
export default AppBody
