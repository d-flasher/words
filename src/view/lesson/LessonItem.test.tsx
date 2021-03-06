import { fireEvent } from '@testing-library/react'

import ApiLessonMock from '../../api/api-lesson-mock'
import Lesson from '../../model/lesson'
import TestUtils from '../../utils/test-utils'
import LessonItem from './LessonItem'

describe('LessonItem', () => {
    test('error handling', () => {
        const { queryByText, queryByPlaceholderText } = TestUtils.render(<LessonItem id="id1"></LessonItem>)
        expect(queryByText(/не найдено/i)).toBeInTheDocument()
        expect(queryByPlaceholderText('start button')).not.toBeInTheDocument()
        expect(queryByPlaceholderText('edit button')).not.toBeInTheDocument()
        expect(queryByPlaceholderText('remove button')).not.toBeInTheDocument()
    })

    const init = () => {
        const result = TestUtils.render(<LessonItem id="id1"></LessonItem>)
        const lesson = new Lesson('id1')
        result.model.lessons.add(lesson)
        return { ...result, lesson }
    }

    test('view', () => {
        const { queryByText, lesson } = init()

        expect(queryByText(/имя пустое/i)).toBeInTheDocument()
        expect(queryByText(/n1/i)).not.toBeInTheDocument()

        lesson.setName('n1')
        expect(queryByText(/имя пустое/i)).not.toBeInTheDocument()
        expect(queryByText(/n1/i)).toBeInTheDocument()
    })

    test('start button', () => {
        const { getByPlaceholderText, history } = init()

        const startBtn = getByPlaceholderText('start button')
        TestUtils.elIsAvailable(startBtn)

        expect(history.location.pathname).toBe('/')
        fireEvent.click(startBtn)
        expect(history.location.pathname).toBe('/start/id1')
    })

    test('remove button', () => {
        const { getByPlaceholderText } = init()

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
        const { getByPlaceholderText, history } = init()

        const lessonItem = getByPlaceholderText('edit button')
        TestUtils.elIsAvailable(lessonItem)

        expect(history.location.pathname).toBe('/')
        fireEvent.click(lessonItem)
        expect(history.location.pathname).toBe('/edit/id1')
    })
})
