import { autorun } from 'mobx'

import Word from './Word'
import Words from './Words'

describe('Words', () => {
    test('seters', () => {
        const words = new Words()
        expect(words.list).toHaveLength(0)

        const fn = jest.fn()
        autorun(() => fn(words.list.length))
        expect(fn).toBeCalledTimes(1)

        const word = new Word('id1')
        const word2 = new Word('id2')

        words.add(word)
        words.add(word2)
        expect(words.list).toHaveLength(2)
        expect(words.list[0]).toEqual(word)
        expect(words.list[1]).toEqual(word2)
        expect(fn).toBeCalledTimes(3)

        words.remove(word)
        expect(words.list).toHaveLength(1)
        expect(words.list[0]).toEqual(word2)
        expect(fn).toBeCalledTimes(4)
    })
})
