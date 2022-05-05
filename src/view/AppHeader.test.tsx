import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { IAuthService } from '../api/auth-service'
import { AuthServiceMock } from '../api/auth-service-mock'
import { AuthContext } from './App'
import AppHeader from './AppHeader'

describe('AppHeader', () => {
    test('auth state changes handling', async () => {
        const authService: IAuthService = new AuthServiceMock('regular')
        const SIGNOUT_BTN_PLACEHOLDER = 'sign out button'
        const { queryByPlaceholderText } = render(
            <AuthContext.Provider value={authService}>
                <AppHeader></AppHeader>
            </AuthContext.Provider>
        )
        expect(queryByPlaceholderText(SIGNOUT_BTN_PLACEHOLDER)).not.toBeInTheDocument()

        await act(() => authService.signIn('1', '2'))
        expect(queryByPlaceholderText(SIGNOUT_BTN_PLACEHOLDER)).toBeInTheDocument()

        await act(() => authService.signOut())
        expect(queryByPlaceholderText(SIGNOUT_BTN_PLACEHOLDER)).not.toBeInTheDocument()
    })
})
