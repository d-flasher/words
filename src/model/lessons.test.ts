import { autorun } from 'mobx'

import MockError from '../api/mock-error'
import Lesson from './lesson'
import Lessons from './lessons'

describe('Lessons', () => {
    test('list, add, remove, clear', () => {
        const lessons = new Lessons()
        expect(lessons.list).toHaveLength(0)

        const fn = jest.fn()
        autorun(() => fn(lessons.list.length))
        expect(fn).toBeCalledTimes(1)

        const lesson1 = new Lesson('id1')
        const lesson2 = new Lesson('id2')

        lessons.add(lesson1)
        lessons.add(lesson2)
        expect(lessons.list).toHaveLength(2)
        expect(lessons.list[0]).toEqual(lesson1)
        expect(lessons.list[1]).toEqual(lesson2)
        expect(fn).toBeCalledTimes(3)

        lessons.remove(lesson1.id)
        expect(lessons.list).toHaveLength(1)
        expect(lessons.list[0]).toEqual(lesson2)
        expect(fn).toBeCalledTimes(4)

        lessons.clear()
        expect(lessons.list).toHaveLength(0)
        expect(fn).toBeCalledTimes(5)
    })

    test('error', () => {
        const lessons = new Lessons()
        expect(lessons.error == null).toBeTruthy()

        const fn = jest.fn()
        autorun(() => fn(lessons.error))
        expect(fn).toBeCalledTimes(1)

        lessons.error = new MockError()
        expect(lessons.error).toBeInstanceOf(MockError)
        expect(fn).toBeCalledTimes(2)

        lessons.error = undefined
        expect(lessons.error == null).toBeTruthy()
        expect(fn).toBeCalledTimes(3)
    })

    test('isLoading', () => {
        const lessons = new Lessons()
        expect(lessons.isLoading === false).toBeTruthy()

        const fn = jest.fn()
        autorun(() => fn(lessons.isLoading))
        expect(fn).toBeCalledTimes(1)

        lessons.isLoading = true
        expect(lessons.isLoading === true).toBeTruthy()
        expect(fn).toBeCalledTimes(2)

        lessons.isLoading = false
        expect(lessons.isLoading === false).toBeTruthy()
        expect(fn).toBeCalledTimes(3)
    })
})
