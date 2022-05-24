import { fireEvent, getByRole } from '@testing-library/react'

import { List_WordsIds } from '../../model/lesson'
import Word from '../../model/word'
import TestUtils from '../../utils/test-utils'
import WordsSelectList from './WordsSelectList'

describe('WordsSelectList', () => {
    const init = (selectedWords: List_WordsIds, onChange: (wordsIds: List_WordsIds) => void) => {
        const result = TestUtils.render(
            <WordsSelectList
                wordsIds={selectedWords}
                onChange={wordsIds => onChange(wordsIds)}
            />
        )

        const addWord = (id: string, value: string) => {
            const word = new Word(id)
            word.setValue(value)
            result.model.words.add(word)
        }
        addWord('id1', 'v1')
        addWord('id2', 'v2')

        return result
    }

    test.each`
        wordsIds          | result
        ${['id1']}        | ${[true, false]}
        ${['id2']}        | ${[false, true]}
        ${['id1', 'id2']} | ${[true, true]}
        ${['id3']}        | ${[false, false]}
    `('default view for "$wordsIds"', ({ wordsIds, result }) => {
        const { getByTestId } = init(wordsIds, () => { })

        const testItem = (testId: string, checked: boolean) => {
            const item2 = getByTestId(testId)
            expect(item2).toBeInTheDocument()
            expect(getByRole(item2, 'checkbox', { checked: checked })).toBeInTheDocument()
        }
        testItem('id1', result[0])
        testItem('id2', result[1])
    })

    test('interraction', async () => {
        const fn = jest.fn()
        const { getByTestId } = init(['id1'], fn)
        expect(fn).toBeCalledTimes(0)

        const testItem = (testId: string, checked: boolean) => {
            const item2 = getByTestId(testId)
            expect(item2).toBeInTheDocument()
            expect(getByRole(item2, 'checkbox', { checked: checked })).toBeInTheDocument()
        }
        testItem('id1', true)
        testItem('id2', false)

        fireEvent.click(getByRole(getByTestId('id2'), 'checkbox'))
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith<[List_WordsIds]>(['id1', 'id2'])

        fireEvent.click(getByRole(getByTestId('id2'), 'checkbox'))
        expect(fn).toBeCalledTimes(2)
        expect(fn).toBeCalledWith<[List_WordsIds]>(['id1'])

        fireEvent.click(getByRole(getByTestId('id1'), 'checkbox'))
        expect(fn).toBeCalledTimes(3)
        expect(fn).toBeCalledWith<[List_WordsIds]>(undefined)
    })
})
