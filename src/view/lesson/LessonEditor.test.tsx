import { fireEvent } from '@testing-library/react'

import ApiLessonMock from '../../api/api-lesson-mock'
import Lesson from '../../model/lesson'
import TestUtils from '../../utils/test-utils'
import LessonEditor from './LessonEditor'

describe('LessonEditor', () => {
    const renderEditor = () => {
        const renderRes = TestUtils.render(<LessonEditor id="id1"></LessonEditor>)
        const entity = new Lesson('id1')
        entity.setName('n1')
        renderRes.model.lessons.add(entity)
        return renderRes
    }

    test('view', () => {
        const { getByLabelText, getByPlaceholderText } = renderEditor()

        TestUtils.elIsAvailable(getByLabelText('name'))
        TestUtils.elIsAvailable(getByPlaceholderText('save button'))
        TestUtils.elIsAvailable(getByPlaceholderText('cancel button'))
    })

    test('cancel button', () => {
        const { getByPlaceholderText, history } = renderEditor()
        const btn = getByPlaceholderText('cancel button')

        TestUtils.linkClick(btn, '/lessons', history)
    })

    test('save button', () => {
        const { getByLabelText, getByPlaceholderText } = renderEditor()
        TestUtils.changeInputValue(getByLabelText('name'), 'n2')

        const btn = getByPlaceholderText('save button')
        const editFn = jest.spyOn(ApiLessonMock.prototype, 'edit').mockImplementation(() => Promise.resolve())

        expect(editFn).toBeCalledTimes(0)
        fireEvent.click(btn)
        expect(editFn).toBeCalledTimes(1)
        expect(editFn).toBeCalledWith<Parameters<typeof ApiLessonMock.prototype.edit>>('id1', { name: 'n2' })
    })
})
