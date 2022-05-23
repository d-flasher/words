import Lesson, { ILesson, ILessonPayload } from '../model/lesson'
import Lessons from '../model/lessons'
import ControllerEntity from './controller-entity'

class ControllerLesson extends ControllerEntity<Lessons, Lesson, ILesson, ILessonPayload> {
    protected _createEntity(data: ILesson): Lesson {
        const entity = new Lesson(data.id)
        if (data.name) entity.setName(data.name)
        return entity
    }

    protected _editEntity(target: Lesson, data: ILesson): void {
        if (data.name) target.setName(data.name)
    }

    protected _removeEntity(data: ILesson): void {
        this._model.remove(data.id)
    }
}
export default ControllerLesson
