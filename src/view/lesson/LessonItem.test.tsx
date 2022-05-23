import { fireEvent } from '@testing-library/react'

import ApiLessonMock from '../../api/api-lesson-mock'
import Lesson from '../../model/lesson'
import TestUtils from '../../utils/test-utils'
import LessonItem from './LessonItem'

describe('LessonItem', () => {
    test('error handling', () => {
        const { queryByText, queryByPlaceholderText } = TestUtils.render(<LessonItem id="id1"></LessonItem>)
        expect(queryByText(/не найдено/i)).toBeInTheDocument()
        expect(queryByPlaceholderText('edit link')).not.toBeInTheDocument()
        expect(queryByPlaceholderText('remove button')).not.toBeInTheDocument()
    })

    test('view', () => {
        const { queryByText, model } = TestUtils.render(<LessonItem id="id1"></LessonItem>)
        const lesson = new Lesson('id1')
        model.lessons.add(lesson)

        expect(queryByText(/имя пустое/i)).toBeInTheDocument()
        expect(queryByText(/n1/i)).not.toBeInTheDocument()

        lesson.setName('n1')
        expect(queryByText(/имя пустое/i)).not.toBeInTheDocument()
        expect(queryByText(/n1/i)).toBeInTheDocument()
    })

    test('remove button', () => {
        const { getByPlaceholderText, model } = TestUtils.render(<LessonItem id="id1"></LessonItem>)
        const lesson = new Lesson('id1')
        model.lessons.add(lesson)

        const removeBtn = getByPlaceholderText('remove button')
        TestUtils.elIsAvailable(removeBtn)

        const fn = jest
            .spyOn(ApiLessonMock.prototype, 'remove')
            .mockImplementation(() => Promise.resolve())
        fireEvent.click(removeBtn)
        expect(fn).toBeCalledTimes(1)
        expect(fn).toHaveBeenCalledWith<Parameters<typeof ApiLessonMock.prototype.remove>>('id1')
    })

    test('select item button', () => {
        const { getByPlaceholderText, history, model } = TestUtils.render(<LessonItem id="id1"></LessonItem>)
        const lesson = new Lesson('id1')
        model.lessons.add(lesson)

        const lessonItem = getByPlaceholderText('lesson item')
        TestUtils.elIsAvailable(lessonItem)

        expect(history.location.pathname).toBe('/')
        fireEvent.click(lessonItem)
        expect(history.location.pathname).toBe('/edit/id1')
    })
})
