import { render } from '@testing-library/react'

import AppModel, { AppModelContext } from '../model/AppModel'
import Word from '../model/Word'
import WordsList from './WordsList'

describe('WordsList', () => {
    test('view', () => {
        const model = new AppModel()
        const { queryAllByRole } = render(
            <AppModelContext.Provider value={model}>
                <WordsList></WordsList>
            </AppModelContext.Provider>
        )
        expect(queryAllByRole('listitem').length).toEqual(0)

        const word1 = new Word('id1')
        model.words.add(word1)
        expect(queryAllByRole('listitem').length).toEqual(1)

        const word2 = new Word('id2')
        model.words.add(word2)
        expect(queryAllByRole('listitem').length).toEqual(2)

        model.words.remove(word1)
        expect(queryAllByRole('listitem').length).toEqual(1)
    })

    test('error handling', () => {
        const model = new AppModel()
        const ERROR_TEXT = 'Test error'
        const { queryByText, debug } = render(
            <AppModelContext.Provider value={model}>
                <WordsList></WordsList>
            </AppModelContext.Provider>
        )
        expect(queryByText(ERROR_TEXT)).not.toBeInTheDocument()

        model.words.error = new Error(ERROR_TEXT)
        expect(queryByText(ERROR_TEXT)).toBeInTheDocument()

        model.words.error = undefined
        expect(queryByText(ERROR_TEXT)).not.toBeInTheDocument()
    })
})
