import { waitFor } from '@testing-library/react'

import { IAuthService, IUser } from './auth-service'
import { AuthServiceMock } from './auth-service-mock'

type TestUser = IUser | null

describe('AuthServiceMock', () => {
    test('state changes', async () => {
        const authService: IAuthService = new AuthServiceMock('regular')

        const fn = jest.fn<void, [TestUser]>()
        const unsubscribe =
            authService.onAuthStateChanged(fn)
        await waitFor(() => {
            expect(fn).toBeCalledTimes(1)
            expect(fn).toBeCalledWith<[TestUser]>(null)
        })

        await waitFor(() => authService.signIn('1', '2'))
        expect(fn).toBeCalledTimes(2)
        expect(fn).toBeCalledWith<[TestUser]>({})

        await waitFor(() => authService.signOut())
        expect(fn).toBeCalledTimes(3)
        expect(fn).toBeCalledWith<[TestUser]>(null)

        unsubscribe()
        await waitFor(() => authService.signIn('1', '2'))
        expect(fn).toBeCalledTimes(3)
    })
})
