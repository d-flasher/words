import { fireEvent } from '@testing-library/react'

import ApiLessonMock from '../api/api-lesson-mock'
import TestUtils from '../utils/test-utils'
import LessonAdd from './LessonAdd'

describe('LessonAdd', () => {
    test('view', () => {
        const { getByLabelText, getByPlaceholderText } = TestUtils.render(<LessonAdd></LessonAdd>)

        const nameInput = getByLabelText('name')
        TestUtils.elIsAvailable(nameInput)
        expect(nameInput).toHaveValue('')

        TestUtils.elIsAvailable(getByPlaceholderText('save button'), false)
        TestUtils.elIsAvailable(getByPlaceholderText('cancel button'))
    })

    test('cancel button click', () => {
        const { getByPlaceholderText, history } = TestUtils.render(<LessonAdd></LessonAdd>)

        TestUtils.linkClick(getByPlaceholderText('cancel button'), '/lessons', history)
    })

    test('save button click', () => {
        const { getByPlaceholderText, getByLabelText } = TestUtils.render(<LessonAdd></LessonAdd>)

        const saveBtn = getByPlaceholderText('save button')

        TestUtils.elIsAvailable(saveBtn, false)
        TestUtils.changeInputValue(getByLabelText('name'), 'n1')
        TestUtils.elIsAvailable(saveBtn, true)

        const fn = jest.spyOn(ApiLessonMock.prototype, 'create').mockImplementation(() => Promise.resolve({ id: 'id1' }))
        expect(fn).toBeCalledTimes(0)
        fireEvent.click(saveBtn)
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith<Parameters<typeof ApiLessonMock.prototype.create>>({ name: 'n1' })
    })
})
