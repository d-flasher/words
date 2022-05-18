import { autorun } from 'mobx'

import Word from './word'

describe('Word', () => {
    test('seters', () => {
        const word = new Word('id1')

        const fn = jest.fn()
        autorun(() => fn(word.id, word.value, word.translate))
        expect(fn).toBeCalledTimes(1)

        expect(word.id).toBe('id1')
        expect(word.value).toBe(null)
        expect(word.translate).toBe(null)

        word.setValue('v1')
        expect(word.value).toBe('v1')
        expect(fn).toBeCalledTimes(2)

        word.setTranslate('t1')
        expect(word.translate).toBe('t1')
        expect(fn).toBeCalledTimes(3)
    })
})
