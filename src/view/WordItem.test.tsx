import { fireEvent } from '@testing-library/react'

import { ApiWordMock } from '../api/api-word-mock'
import Word from '../model/word'
import TestUtils from '../utils/test-utils'
import WordItem from './WordItem'

describe('WordItem', () => {
    test('error handling', () => {
        const { queryByText, queryByPlaceholderText } = TestUtils.render(<WordItem id="id1"></WordItem>)
        expect(queryByText(/не найдено/i)).toBeInTheDocument()
        expect(queryByPlaceholderText('edit link')).not.toBeInTheDocument()
        expect(queryByPlaceholderText('remove button')).not.toBeInTheDocument()
    })

    test('view', () => {
        const { queryByText, model } = TestUtils.render(<WordItem id="id1"></WordItem>)
        const word = new Word('id1')
        model.words.add(word)

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

    test('remove button', () => {
        const { getByPlaceholderText, model } = TestUtils.render(<WordItem id="id1"></WordItem>)
        const word = new Word('id1')
        model.words.add(word)

        const removeBtn = getByPlaceholderText('remove button')
        TestUtils.elIsAvailable(removeBtn)

        const fn = jest
            .spyOn(ApiWordMock.prototype, 'remove')
            .mockImplementation(() => Promise.resolve())
        fireEvent.click(removeBtn)
        expect(fn).toBeCalledTimes(1)
        expect(fn).toHaveBeenCalledWith<Parameters<typeof ApiWordMock.prototype.remove>>('id1')
    })

    test('select word button', () => {
        const { getByPlaceholderText, history, model } = TestUtils.render(<WordItem id="id1"></WordItem>)
        const word = new Word('id1')
        model.words.add(word)

        const wordItem = getByPlaceholderText('word item')
        TestUtils.elIsAvailable(wordItem)

        expect(history.location.pathname).toBe('/')
        fireEvent.click(wordItem)
        expect(history.location.pathname).toBe('/edit/id1')
    })
})
