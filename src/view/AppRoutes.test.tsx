import TestUtils from '../utils/test-utils'
import AppRoutes from './AppRoutes'

describe('AppRoutes', () => {
    test.each`
        path                    | pages
        ${'/'}                  | ${['body-outlet']}
        ${'/qwerty'}            | ${['body-outlet', '404']}

        ${'/words'}             | ${['body-outlet', 'words-outlet']}
        ${'/words/edit/1'}      | ${['body-outlet', 'words-outlet', 'word-page-edit']}
        ${'/words/add'}         | ${['body-outlet', 'words-outlet', 'word-page-add']}

        ${'/lessons'}           | ${['body-outlet', 'lessons-outlet']}
        ${'/lessons/edit/1'}    | ${['body-outlet', 'lessons-outlet', 'lesson-page-edit']}
        ${'/lessons/add'}       | ${['body-outlet', 'lessons-outlet', 'lesson-page-add']}
        ${'/lessons/start/1'}   | ${['body-outlet', 'lessons-outlet', 'lesson-page-start']}
    `('in path "$path" to be pages: "$pages"', ({ path, pages }) => {
        const { queryByTestId } = TestUtils.render(<AppRoutes></AppRoutes>, path)
        const pagesAsArr = pages as string[]
        pagesAsArr.forEach(pageTestId => {
            expect(queryByTestId(pageTestId)).toBeInTheDocument()
        })
    })

    test('a default redirect to "words"', () => {
        const { history } = TestUtils.render(<AppRoutes></AppRoutes>, '/')

        expect(history.location.pathname).toBe('/words')
    })
})
