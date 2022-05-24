import { autorun } from 'mobx'

import Lesson from './lesson'

describe('Lesson', () => {
    test('seters', () => {
        const lesson = new Lesson('id1')

        const fn = jest.fn()
        autorun(() => fn(lesson.id, lesson.name, lesson.wordsIds?.length))
        expect(fn).toBeCalledTimes(1)

        expect(lesson.id).toBe('id1')
        expect(lesson.name).toBe(null)

        lesson.setName('n1')
        expect(lesson.name).toBe('n1')
        expect(fn).toBeCalledTimes(2)

        lesson.setWordsIds(['id1', 'id2'])
        expect(lesson.wordsIds).toEqual(['id1', 'id2'])
        expect(fn).toBeCalledTimes(3)
    })
})
