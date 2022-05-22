import { autorun } from 'mobx'

import MockError from '../api/mock-error'
import Word from './word'
import Words from './words'

describe('Words', () => {
    test('list, add, remove, clear', () => {
        const words = new Words()
        expect(words.list).toHaveLength(0)

        const fn = jest.fn()
        autorun(() => fn(words.list.length))
        expect(fn).toBeCalledTimes(1)

        const word1 = new Word('id1')
        const word2 = new Word('id2')

        words.add(word1)
        words.add(word2)
        expect(words.list).toHaveLength(2)
        expect(words.list[0]).toEqual(word1)
        expect(words.list[1]).toEqual(word2)
        expect(fn).toBeCalledTimes(3)

        words.remove(word1.id)
        expect(words.list).toHaveLength(1)
        expect(words.list[0]).toEqual(word2)
        expect(fn).toBeCalledTimes(4)

        words.clear()
        expect(words.list).toHaveLength(0)
        expect(fn).toBeCalledTimes(5)
    })

    test('error', () => {
        const words = new Words()
        expect(words.error == null).toBeTruthy()

        const fn = jest.fn()
        autorun(() => fn(words.error))
        expect(fn).toBeCalledTimes(1)

        words.error = new MockError()
        expect(words.error).toBeInstanceOf(MockError)
        expect(fn).toBeCalledTimes(2)

        words.error = undefined
        expect(words.error == null).toBeTruthy()
        expect(fn).toBeCalledTimes(3)
    })

    test('isLoading', () => {
        const words = new Words()
        expect(words.isLoading === false).toBeTruthy()

        const fn = jest.fn()
        autorun(() => fn(words.isLoading))
        expect(fn).toBeCalledTimes(1)

        words.isLoading = true
        expect(words.isLoading === true).toBeTruthy()
        expect(fn).toBeCalledTimes(2)

        words.isLoading = false
        expect(words.isLoading === false).toBeTruthy()
        expect(fn).toBeCalledTimes(3)
    })
})
