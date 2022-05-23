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

        const createdData = await api.create({ name: 'n1' })
        expect(model.list).toHaveLength(1)

        const createdEntity = model.getById(createdData.id)
        expect(createdEntity == null).not.toBeTruthy()
        expect(createdEntity!.name).toBe('n1')

        await api.edit(createdData.id, { name: 'v2' })
        expect(createdEntity!.name).toBe('v2')

        await api.remove(createdData.id)
        expect(model.list).toHaveLength(0)
    })
})
