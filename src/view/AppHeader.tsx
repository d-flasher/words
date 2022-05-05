import Logout from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { FC, useContext, useEffect, useState } from 'react'

import { IUser } from '../api/auth-service'
import { AuthContext } from './App'

const AppHeader: FC = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const authService = useContext(AuthContext)

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
                    <IconButton
                        aria-label="sign out"
                        placeholder="sign out button"
                        onClick={onSignout}
                    >
                        <Logout />
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    )
}
export default AppHeader
