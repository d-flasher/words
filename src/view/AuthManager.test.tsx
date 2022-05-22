import { act, render, waitForElementToBeRemoved } from '@testing-library/react'

import IApiAuth from '../api/api-auth'
import ApiAuthMock from '../api/api-auth-mock'
import { ApiAuthContext } from './App'
import AuthManager from './AuthManager'

describe('AuthManager', () => {
    test('auth state changes handling', async () => {
        const authService: IApiAuth = new ApiAuthMock('regular')
        const AUTH_FORM_HEADER = 'Sign in with email'
        const { getByRole, queryByText, queryByTestId } = render(
            <ApiAuthContext.Provider value={authService}>
                <AuthManager></AuthManager>
            </ApiAuthContext.Provider>
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
