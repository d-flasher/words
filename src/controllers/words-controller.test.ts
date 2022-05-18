import { ApiWordMock } from '../api/api-entity-mock'
import Words from '../model/words'
import WordsController from './words-controller'

describe('WordsController', () => {
    test('create/edit entity', async () => {
        const api = new ApiWordMock('regular')
        const model = new Words()
        const entityController = new WordsController(model, api)
        entityController.start()

        const createdData = await api.create({ value: 'v1', translate: 't1' })

        const createdEntity = model.getById(createdData.id)
        expect(createdEntity == null).not.toBeTruthy()
        expect(createdEntity!.value).toBe('v1')
        expect(createdEntity!.translate).toBe('t1')

        await api.edit(createdData.id, { value: 'v2', translate: 't2' })
        expect(createdEntity!.value).toBe('v2')
        expect(createdEntity!.translate).toBe('t2')
    })
})
