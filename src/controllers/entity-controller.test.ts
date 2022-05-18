import { ApiWordMock } from '../api/api-entity-mock'
import Words from '../model/Words'
import { MockType } from '../utils/common-types'
import WordsController from './words-controller'

describe('EntityController', () => {

    const init = (type: MockType) => {
        const api = new ApiWordMock(type)
        const model = new Words()
        const entityController = new WordsController(model, api)
        return { api, model, entityController }
    }

    test('default work', async () => {
        const { api, model, entityController } = init('regular')
        entityController.start()
        expect(model.list).toHaveLength(0)

        const createdData = await api.create({ value: 'v1', translate: 't1' })
        expect(model.list).toHaveLength(1)

        const createdEntity = model.getById(createdData.id)
        expect(createdEntity == null).not.toBeTruthy()

        await api.remove(createdData.id)
        expect(model.list).toHaveLength(0)
        expect(model.getById(createdData.id) == null).toBeTruthy()
    })

    test('start/stop', async () => {
        const { api, model, entityController } = init('regular')
        expect(model.list).toHaveLength(0)

        await api.create({ value: 'v1', translate: 't1' })
        expect(model.list).toHaveLength(0)

        entityController.start()
        expect(model.list).toHaveLength(1)

        await api.create({ value: 'v2', translate: 't2' })
        expect(model.list).toHaveLength(2)
    })
})
