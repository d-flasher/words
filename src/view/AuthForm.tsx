import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, useState } from 'react'

import { useNotNullContext } from '../utils/common-types'
import { AuthContext } from './App'

const AuthForm: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [signinError, setSigninError] = useState('')
    const authService = useNotNullContext(AuthContext)

    const isSigninEnabled = Boolean(email) && Boolean(password)

    const onEmailChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailError('')
        setSigninError('')
        setEmail(e.target.value)
    }

    const onPasswordChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordError('')
        setSigninError('')
        setPassword(e.target.value)
    }

    const onSigninClick = async () => {
        if (email.length < 3) {
            setEmailError('Must be a least 3 characters')
            return
        }

        if (password.length < 3) {
            setPasswordError('Must be a least 3 characters')
            return
        }

        try {
            await authService.signIn(email, password)
        } catch (error) {
            setSigninError((error as Error).message)
        }
    }

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={2}>
                        {
                            signinError && <Grid item xs={12}>
                                <Alert severity="error">
                                    {signinError}
                                </Alert>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Typography variant="h5" component="div">
                                Sign in with email
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                autoFocus
                                value={email}
                                onChange={onEmailChanges}
                                error={emailError.length > 0}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={password}
                                onChange={onPasswordChanges}
                                error={passwordError.length > 0}
                                helperText={passwordError}
                            />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Button
                                placeholder="sign in button"
                                variant="contained"
                                sx={{ width: '100%' }}
                                disabled={!isSigninEnabled}
                                onClick={onSigninClick}
                            >
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}
export default AuthForm
