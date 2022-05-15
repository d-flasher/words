import { IWord } from '../model/Word'
import { OnChangesFn } from './api-entity'
import { ApiWordMock } from './api-word-mock'
import MockError from './mock-error'

describe('ApiWordMock', () => {
    test('regular mode', async () => {
        const api = new ApiWordMock('regular')
        const fn = jest.fn()

        api.changesTracking(fn)
        expect(fn).toBeCalledTimes(0)

        // create
        const createdWord = await api.create({ value: 'v1', translate: 't1' })
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith<Parameters<OnChangesFn<IWord>>>([{ type: 'added', data: createdWord }])

        // get
        const foundWord = await api.get(createdWord.id)
        expect(foundWord).toBe(createdWord)
        expect(fn).toBeCalledTimes(1)

        // edit
        await api.edit(createdWord.id, { value: 'v11', translate: 't11' })
        const foundEditedWord = await api.get(createdWord.id)
        expect(foundEditedWord).toEqual<IWord>({ id: createdWord.id, value: 'v11', translate: 't11' })
        expect(fn).toBeCalledTimes(2)
        expect(fn).toBeCalledWith<Parameters<OnChangesFn<IWord>>>([{ type: 'edited', data: createdWord }])

        // remove
        await api.remove(createdWord.id)
        const foundRemovedWord = await api.get(createdWord.id)
        expect(foundRemovedWord).toEqual(null)
        expect(fn).toBeCalledTimes(3)
        expect(fn).toBeCalledWith<Parameters<OnChangesFn<IWord>>>([{ type: 'removed', data: createdWord }])
    })

    test('unsubscribe', async () => {
        const api = new ApiWordMock('regular')
        const fn = jest.fn()

        const unsubscriber =
            api.changesTracking(fn)
        expect(fn).toBeCalledTimes(0)

        await api.create({ value: 'v1', translate: 't1' })
        expect(fn).toBeCalledTimes(1)

        unsubscriber()
        await api.create({ value: 'v2', translate: 't2' })
        expect(fn).toBeCalledTimes(1)
    })

    test('observer after created', async () => {
        const api = new ApiWordMock('regular')
        const fn = jest.fn()

        const word1 = await api.create({ value: 'v1', translate: 't1' })
        expect(fn).toBeCalledTimes(0)
        const word2 = await api.create({ value: 'v2', translate: 't2' })
        expect(fn).toBeCalledTimes(0)

        api.changesTracking(fn)
        expect(fn).toBeCalledTimes(1)
        expect(fn).toBeCalledWith<Parameters<OnChangesFn<IWord>>>([
            { type: 'added', data: word1 },
            { type: 'added', data: word2 },
        ])
    })

    test('error handling', async () => {
        const api = new ApiWordMock('error')
        const fn = jest.fn()

        api.changesTracking(fn)
        expect(fn).toBeCalledTimes(0)

        try {
            await api.create({ value: 'v1', translate: 't1' })
        } catch (error) {
            expect(error).toBeInstanceOf(MockError)
        }

        expect(fn).toBeCalledTimes(0)
    })
})
