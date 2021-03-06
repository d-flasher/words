import { waitFor } from '@testing-library/react'

import IApiAuth, { IUser } from './api-auth'
import ApiAuthMock from './api-auth-mock'
import MockError from './mock-error'

type TestUser = IUser | null

describe('ApiAuthMock', () => {
    test('regular mode', async () => {
        const authService: IApiAuth = new ApiAuthMock('regular')

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
        const authService: IApiAuth = new ApiAuthMock('error')

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
