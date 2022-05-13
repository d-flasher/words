import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { MemoryRouter, Router } from 'react-router-dom'

import AppRoutes from './AppRoutes'

describe('AppRoutes', () => {
    test.each`
        path                    | pages
        ${'/'}                  | ${['body-outlet']}
        ${'/qwerty'}            | ${['body-outlet', '404']}

        ${'/words'}             | ${['body-outlet', 'words-outlet']}
        ${'/words/edit/1'}      | ${['body-outlet', 'words-outlet', 'word-page-edit']}
        ${'/words/add'}         | ${['body-outlet', 'words-outlet', 'word-page-add']}
    `('in path "$path" to be pages: "$pages"', ({ path, pages }) => {
        const { queryByTestId } = render(
            <MemoryRouter initialEntries={[path]}>
                <AppRoutes></AppRoutes>
            </MemoryRouter>)
        const pagesAsArr = pages as string[]
        pagesAsArr.forEach(pageTestId => {
            expect(queryByTestId(pageTestId)).toBeInTheDocument()
        })
    })

    test('a default redirect to "words"', () => {
        const history = createMemoryHistory({ initialEntries: ['/'] })
        render(
            <Router
                navigator={history}
                location={'/'}
            >
                <AppRoutes></AppRoutes>
            </Router>
        )

        expect(history.location.pathname).toBe('/words')
    })
})
