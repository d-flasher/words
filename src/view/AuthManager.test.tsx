import { act, render, waitForElementToBeRemoved } from '@testing-library/react'

import IAuthService from '../api/auth-service'
import AuthServiceMock from '../api/auth-service-mock'
import { AuthContext } from './App'
import AuthManager from './AuthManager'

describe('AuthManager', () => {
    test('auth state changes handling', async () => {
        const authService: IAuthService = new AuthServiceMock('regular')
        const AUTH_FORM_HEADER = 'Sign in with email'
        const { getByRole, queryByText, queryByTestId } = render(
            <AuthContext.Provider value={authService}>
                <AuthManager></AuthManager>
            </AuthContext.Provider>
        )
        const loadingEl = getByRole('progressbar')
        expect(loadingEl).toBeInTheDocument()

        await waitForElementToBeRemoved(loadingEl)
        expect(queryByText(AUTH_FORM_HEADER)).toBeInTheDocument()

        await act(() => authService.signIn('1', '2'))
        expect(queryByText(AUTH_FORM_HEADER)).not.toBeInTheDocument()
        expect(queryByTestId('auth-children')).toBeInTheDocument()

        await act(() => authService.signOut())
        expect(queryByText(AUTH_FORM_HEADER)).toBeInTheDocument()
        expect(queryByTestId('auth-children')).not.toBeInTheDocument()
    })
})
