import { fireEvent, render, waitFor } from '@testing-library/react'

import { AuthServiceMock } from '../api/auth-service-mock'
import { TestUtils } from '../utils/TestUtils'
import { AuthContext } from './App'
import AuthForm from './AuthForm'

beforeEach(() => {
    jest.restoreAllMocks()
})

describe('AuthForm', () => {
    test('view', () => {
        const { getByLabelText, getByPlaceholderText } = render(<AuthForm></AuthForm>)

        const emailInput = getByLabelText(/email/i)
        TestUtils.elIsAvailable(emailInput)
        expect(emailInput).toHaveAttribute('type', 'email')

        const passwordInput = getByLabelText(/password/i)
        TestUtils.elIsAvailable(passwordInput)
        expect(passwordInput).toHaveAttribute('type', 'password')

        TestUtils.elIsAvailable(getByPlaceholderText(/sign in button/i), false)
    })

    test('inputs interraction', () => {
        const { getByLabelText, getByPlaceholderText } = render(<AuthForm></AuthForm>)
        const emailInput = getByLabelText(/email/i)
        const passwordInput = getByLabelText(/password/i)
        const signinBtn = getByPlaceholderText(/sign in button/i)

        TestUtils.elIsAvailable(signinBtn, false)
        TestUtils.changeInputValue(emailInput, 'test@email.ru')
        TestUtils.changeInputValue(passwordInput, '123')
        TestUtils.elIsAvailable(signinBtn)
    })

    test('signin', () => {
        const { getByLabelText, getByPlaceholderText, queryByText } = render(
            <AuthContext.Provider value={new AuthServiceMock('regular')}>
                <AuthForm></AuthForm>
            </AuthContext.Provider>
        )

        const email = 'test@email.ru'
        const password = '123'
        const emailInput = getByLabelText(/email/i)
        const passwordInput = getByLabelText(/password/i)
        const signinBtn = getByPlaceholderText(/sign in button/i)
        TestUtils.changeInputValue(emailInput, email)
        TestUtils.changeInputValue(passwordInput, password)

        expect(queryByText(/error test message/i)).not.toBeInTheDocument()
        const fn = jest.spyOn(AuthServiceMock.prototype, 'signIn').mockImplementation(() => Promise.resolve())

        fireEvent.click(signinBtn)
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith<Parameters<typeof AuthServiceMock.prototype.signIn>>(email, password)
        waitFor(() => expect(queryByText(/error test message/i)).not.toBeInTheDocument())
    })

    test('signin error handling', async () => {
        const { getByLabelText, getByPlaceholderText, queryByText, findByText } = render(
            <AuthContext.Provider value={new AuthServiceMock('error')}>
                <AuthForm></AuthForm>
            </AuthContext.Provider>
        )
        const emailInput = getByLabelText(/email/i)
        const passwordInput = getByLabelText(/password/i)
        const signinBtn = getByPlaceholderText(/sign in button/i)
        TestUtils.changeInputValue(emailInput, 'test@email.ru')
        TestUtils.changeInputValue(passwordInput, '123')

        expect(queryByText(/error test message/i)).not.toBeInTheDocument()
        fireEvent.click(signinBtn)
        expect(await findByText(/error test message/i)).toBeInTheDocument()

        TestUtils.changeInputValue(emailInput, 'test@email.ru')
        expect(queryByText(/error test message/i)).not.toBeInTheDocument()
    })
})
