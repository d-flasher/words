import { render } from '@testing-library/react'

import { TestUtils } from '../utils/TestUtils'
import AuthForm from './AuthForm'

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
})
