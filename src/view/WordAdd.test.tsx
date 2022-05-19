import { fireEvent } from '@testing-library/react'

import { ApiWordMock } from '../api/api-entity-mock'
import TestUtils from '../utils/test-utils'
import WordAdd from './WordAdd'

describe('WordAdd', () => {
    test('view', () => {
        const { getByLabelText, getByPlaceholderText } = TestUtils.render(<WordAdd></WordAdd>)

        const valueInput = getByLabelText('value')
        TestUtils.elIsAvailable(valueInput)
        expect(valueInput).toHaveValue('')

        const translateInput = getByLabelText('translate')
        TestUtils.elIsAvailable(translateInput)
        expect(translateInput).toHaveValue('')

        TestUtils.elIsAvailable(getByPlaceholderText('save button'), false)
        TestUtils.elIsAvailable(getByPlaceholderText('cancel button'))
    })

    test('cancel button click', () => {
        const { getByPlaceholderText, history } = TestUtils.render(<WordAdd></WordAdd>)

        TestUtils.linkClick(getByPlaceholderText('cancel button'), '/words', history)
    })

    test('save button click', () => {
        const { getByPlaceholderText, getByLabelText } = TestUtils.render(<WordAdd></WordAdd>)

        const saveBtn = getByPlaceholderText('save button')

        TestUtils.elIsAvailable(saveBtn, false)
        TestUtils.changeInputValue(getByLabelText('value'), 'v1')
        TestUtils.changeInputValue(getByLabelText('translate'), 't1')
        TestUtils.elIsAvailable(saveBtn, true)

        const fn = jest.spyOn(ApiWordMock.prototype, 'create').mockImplementation(() => Promise.resolve({ id: 'id1' }))
        expect(fn).toBeCalledTimes(0)
        fireEvent.click(saveBtn)
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith<Parameters<typeof ApiWordMock.prototype.create>>({ value: 'v1', translate: 't1' })
    })
})
