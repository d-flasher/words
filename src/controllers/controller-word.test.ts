import ApiWordMock from '../api/api-word-mock'
import Words from '../model/words'
import ControllerWord from './controller-word'

describe('ControllerWord', () => {
    test('create/edit entity', async () => {
        const api = new ApiWordMock('regular')
        const model = new Words()
        const entityController = new ControllerWord(model, api)
        entityController.start()
        expect(model.list).toHaveLength(0)

        const createdData = await api.create({ value: 'v1', translate: 't1' })
        expect(model.list).toHaveLength(1)

        const createdEntity = model.getById(createdData.id)
        expect(createdEntity == null).not.toBeTruthy()
        expect(createdEntity!.value).toBe('v1')
        expect(createdEntity!.translate).toBe('t1')

        await api.edit(createdData.id, { value: 'v2', translate: 't2' })
        expect(createdEntity!.value).toBe('v2')
        expect(createdEntity!.translate).toBe('t2')

        await api.remove(createdData.id)
        expect(model.list).toHaveLength(0)
    })
})
