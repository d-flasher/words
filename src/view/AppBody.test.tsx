import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { IAuthService } from '../api/auth-service'
import { AuthServiceMock } from '../api/auth-service-mock'
import { AuthContext } from './App'
import AppBody from './AppBody'

describe('AppBody', () => {
    test('auth state changes handling', async () => {
        const authService: IAuthService = new AuthServiceMock('regular')
        const AUTH_FORM_HEADER = 'Sign in with email'
        const { queryByText } = render(
            <AuthContext.Provider value={authService}>
                <AppBody></AppBody>
            </AuthContext.Provider>
        )
        expect(queryByText('Loading...')).toBeInTheDocument()

        await act(() => authService.signIn('1', '2'))
        expect(queryByText('Loading...')).not.toBeInTheDocument()
        expect(queryByText(AUTH_FORM_HEADER)).not.toBeInTheDocument()

        await act(() => authService.signOut())
        expect(queryByText(AUTH_FORM_HEADER)).toBeInTheDocument()
    })
})