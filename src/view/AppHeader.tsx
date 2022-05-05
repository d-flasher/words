import Logout from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { FC, useEffect, useState } from 'react'

import { IUser } from '../api/auth-service'
import { useNotNullContext } from '../utils/common-types'
import { AuthContext } from './App'

const AppHeader: FC = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const authService = useNotNullContext(AuthContext)

    useEffect(() => {
        return authService.onAuthStateChanged(user => {
            setUser(user)
        })
    })

    const onSignout = () => authService.signOut()

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Box sx={{ width: '100%' }}></Box>

                {
                    user &&
                    <IconButton aria-label="sign out" onClick={onSignout}>
                        <Logout />
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    )
}
export default AppHeader
