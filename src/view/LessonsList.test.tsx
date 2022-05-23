import Lesson from '../model/lesson'
import TestUtils from '../utils/test-utils'
import LessonsList from './LessonsList'

describe('LessonsList', () => {
    test('loading feedback handling', () => {
        const { queryByRole, model } = TestUtils.render(<LessonsList></LessonsList>)
        expect(queryByRole('progressbar')).not.toBeInTheDocument()

        model.lessons.isLoading = true
        expect(queryByRole('progressbar')).toBeInTheDocument()

        model.lessons.isLoading = false
        expect(queryByRole('progressbar')).not.toBeInTheDocument()
    })

    test('view', () => {
        const { queryAllByRole, model } = TestUtils.render(<LessonsList></LessonsList>)
        expect(queryAllByRole('listitem').length).toEqual(0)

        const lesson1 = new Lesson('id1')
        model.lessons.add(lesson1)
        expect(queryAllByRole('listitem').length).toEqual(1)

        const lesson2 = new Lesson('id2')
        model.lessons.add(lesson2)
        expect(queryAllByRole('listitem').length).toEqual(2)

        model.lessons.remove(lesson1.id)
        expect(queryAllByRole('listitem').length).toEqual(1)
    })

    test('error handling', () => {
        const ERROR_TEXT = 'Test error'
        const { queryByText, model } = TestUtils.render(<LessonsList></LessonsList>)
        expect(queryByText(ERROR_TEXT)).not.toBeInTheDocument()

        model.lessons.error = new Error(ERROR_TEXT)
        expect(queryByText(ERROR_TEXT)).toBeInTheDocument()

        model.lessons.error = undefined
        expect(queryByText(ERROR_TEXT)).not.toBeInTheDocument()
    })

    test('add button', () => {
        const { getByPlaceholderText, history } = TestUtils.render(<LessonsList></LessonsList>, '/lessons')

        const addBtn = getByPlaceholderText('add button')
        TestUtils.elIsAvailable(addBtn)
        TestUtils.linkClick(addBtn, '/add', history)
    })
})
