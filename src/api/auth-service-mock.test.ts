import { waitFor } from '@testing-library/react'

import { IAuthService, IUser } from './auth-service'
import { AuthServiceMock } from './auth-service-mock'
import MockError from './mock-error'

type TestUser = IUser | null

describe('AuthServiceMock', () => {
    test('regular mode', async () => {
        const authService: IAuthService = new AuthServiceMock('regular')

        const fn = jest.fn<void, [TestUser]>()
        const unsubscribe =
            authService.onAuthStateChanged(fn)
        await waitFor(() => {
            expect(fn).toBeCalledTimes(1)
            expect(fn).toBeCalledWith<[TestUser]>(null)
        })

        await authService.signIn('1', '2')
        expect(fn).toBeCalledTimes(2)
        expect(fn).toBeCalledWith<[TestUser]>({})

        await authService.signOut()
        expect(fn).toBeCalledTimes(3)
        expect(fn).toBeCalledWith<[TestUser]>(null)

        unsubscribe()
        await authService.signIn('1', '2')
        expect(fn).toBeCalledTimes(3)
    })

    test('error mode', async () => {
        const authService: IAuthService = new AuthServiceMock('error')

        const fn = jest.fn<void, [TestUser]>()
        authService.onAuthStateChanged(fn)
        await waitFor(() => {
            expect(fn).toBeCalledTimes(1)
            expect(fn).toBeCalledWith<[TestUser]>(null)
        })

        try {
            await authService.signIn('1', '2')
        } catch (error) {
            expect(error).toBeInstanceOf(MockError)
            expect(fn).toBeCalledTimes(1)
        }

        try {
            await authService.signOut()
        } catch (error) {
            expect(error).toBeInstanceOf(MockError)
            expect(fn).toBeCalledTimes(1)
        }
    })
})
