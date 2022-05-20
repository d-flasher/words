import Word from '../model/word'
import TestUtils from '../utils/test-utils'
import WordsList from './WordsList'

describe('WordsList', () => {
    test('loading feedback handling', () => {
        const { queryByRole, model } = TestUtils.render(<WordsList></WordsList>)
        expect(queryByRole('progressbar')).not.toBeInTheDocument()

        model.words.isLoading = true
        expect(queryByRole('progressbar')).toBeInTheDocument()

        model.words.isLoading = false
        expect(queryByRole('progressbar')).not.toBeInTheDocument()
    })

    test('view', () => {
        const { queryAllByRole, model } = TestUtils.render(<WordsList></WordsList>)
        expect(queryAllByRole('listitem').length).toEqual(0)

        const word1 = new Word('id1')
        model.words.add(word1)
        expect(queryAllByRole('listitem').length).toEqual(1)

        const word2 = new Word('id2')
        model.words.add(word2)
        expect(queryAllByRole('listitem').length).toEqual(2)

        model.words.remove(word1.id)
        expect(queryAllByRole('listitem').length).toEqual(1)
    })

    test('error handling', () => {
        const ERROR_TEXT = 'Test error'
        const { queryByText, model } = TestUtils.render(<WordsList></WordsList>)
        expect(queryByText(ERROR_TEXT)).not.toBeInTheDocument()

        model.words.error = new Error(ERROR_TEXT)
        expect(queryByText(ERROR_TEXT)).toBeInTheDocument()

        model.words.error = undefined
        expect(queryByText(ERROR_TEXT)).not.toBeInTheDocument()
    })

    test('add button', () => {
        const { getByPlaceholderText, history } = TestUtils.render(<WordsList></WordsList>, '/words')

        const addBtn = getByPlaceholderText('add button')
        TestUtils.elIsAvailable(addBtn)
        TestUtils.linkClick(addBtn, '/add', history)
    })
})
