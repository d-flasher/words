import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import Logout from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { FC, useContext, useEffect, useState } from 'react'

import { IUser } from '../api/auth-service'
import { AuthContext } from './App'
import { ThemeContext } from './ThemeContainer'

const AppHeader: FC = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const authService = useContext(AuthContext)
    const themeContext = useContext(ThemeContext)

    useEffect(() => {
        return authService.onAuthStateChanged(user => {
            setUser(user)
        })
    })

    const onSignout = () => authService.signOut()

    const mode = themeContext.theme.palette.mode

    const onSwitchTheme = () => {
        themeContext.switchTheme(mode)
    }

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Box sx={{ width: '100%' }}></Box>

                <IconButton aria-label="toggle mode button" onClick={onSwitchTheme}>
                    {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>

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
