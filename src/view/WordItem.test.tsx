import { render } from '@testing-library/react'

import AppModel from '../model/app-model'
import Word from '../model/word'
import { AppModelContext } from './App'
import WordItem from './WordItem'

describe('WordItem', () => {
    test('error handling', () => {
        const model = new AppModel()
        const { queryByText, queryByPlaceholderText } = render(
            <AppModelContext.Provider value={model}>
                <WordItem id="id1"></WordItem>
            </AppModelContext.Provider>
        )
        expect(queryByText(/не найдено/i)).toBeInTheDocument()
        expect(queryByPlaceholderText('edit link')).not.toBeInTheDocument()
        expect(queryByPlaceholderText('remove button')).not.toBeInTheDocument()
    })

    test('view', () => {
        const model = new AppModel()
        const word = new Word('id1')
        model.words.add(word)
        const { queryByText } = render(
            <AppModelContext.Provider value={model}>
                <WordItem id="id1"></WordItem>
            </AppModelContext.Provider>
        )

        expect(queryByText(/значение пустое/i)).toBeInTheDocument()
        expect(queryByText(/перевод пустой/i)).toBeInTheDocument()
        expect(queryByText(/v1/i)).not.toBeInTheDocument()
        expect(queryByText(/t1/i)).not.toBeInTheDocument()

        word.setValue('v1')
        expect(queryByText(/значение пустое/i)).not.toBeInTheDocument()
        expect(queryByText(/v1/i)).toBeInTheDocument()

        word.setTranslate('t1')
        expect(queryByText(/перевод пустой/i)).not.toBeInTheDocument()
        expect(queryByText(/t1/i)).toBeInTheDocument()
    })
})
