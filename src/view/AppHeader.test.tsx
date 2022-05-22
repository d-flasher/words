import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import IApiAuth from '../api/api-auth'
import ApiAuthMock from '../api/api-auth-mock'
import { ApiAuthContext } from './App'
import AppHeader from './AppHeader'

describe('AppHeader', () => {
    test('auth state changes handling', async () => {
        const authService: IApiAuth = new ApiAuthMock('regular')
        const SIGNOUT_BTN_PLACEHOLDER = 'sign out button'
        const { queryByPlaceholderText } = render(
            <ApiAuthContext.Provider value={authService}>
                <AppHeader></AppHeader>
            </ApiAuthContext.Provider>
        )
        expect(queryByPlaceholderText(SIGNOUT_BTN_PLACEHOLDER)).not.toBeInTheDocument()

        await act(() => authService.signIn('1', '2'))
        expect(queryByPlaceholderText(SIGNOUT_BTN_PLACEHOLDER)).toBeInTheDocument()

        await act(() => authService.signOut())
        expect(queryByPlaceholderText(SIGNOUT_BTN_PLACEHOLDER)).not.toBeInTheDocument()
    })
})
