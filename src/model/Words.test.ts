import { autorun } from 'mobx'

import Word from './Word'
import Words from './Words'

describe('Words', () => {
    test('seters', () => {
        const words = new Words()
        expect(words.words).toHaveLength(0)

        const fn = jest.fn()
        autorun(() => fn(words.words.length))
        expect(fn).toBeCalledTimes(1)

        const word = new Word('id1')
        const word2 = new Word('id2')

        words.addWord(word)
        words.addWord(word2)
        expect(words.words).toHaveLength(2)
        expect(words.words[0]).toEqual(word)
        expect(words.words[1]).toEqual(word2)
        expect(fn).toBeCalledTimes(3)

        words.removeWord(word)
        expect(words.words).toHaveLength(1)
        expect(words.words[0]).toEqual(word2)
        expect(fn).toBeCalledTimes(4)
    })
})
