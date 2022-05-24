import ApiLessonMock from '../api/api-lesson-mock'
import Lessons from '../model/lessons'
import ControllerLesson from './controller-lesson'

describe('ControllerLesson', () => {
    test('create/edit entity', async () => {
        const api = new ApiLessonMock('regular')
        const model = new Lessons()
        const entityController = new ControllerLesson(model, api)
        entityController.start()
        expect(model.list).toHaveLength(0)

        const createdData = await api.create({ name: 'n1', wordsIds: ['id1', 'id2'] })
        expect(model.list).toHaveLength(1)

        const createdEntity = model.getById(createdData.id)
        expect(createdEntity == null).not.toBeTruthy()
        expect(createdEntity!.name).toBe('n1')
        expect(createdEntity!.wordsIds).toEqual(['id1', 'id2'])

        await api.edit(createdData.id, { name: 'v2', wordsIds: ['id3'] })
        expect(createdEntity!.name).toBe('v2')
        expect(createdEntity!.wordsIds).toEqual(['id3'])

        await api.remove(createdData.id)
        expect(model.list).toHaveLength(0)
    })
})
