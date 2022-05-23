import { ILesson, ILessonPayload } from '../model/lesson'
import Utils from '../utils/utils'
import { ApiEntityMock } from './api-entity-mock'

class ApiLessonMock extends ApiEntityMock<ILesson, ILessonPayload> {
    protected _createFromPayload(payload: ILessonPayload): ILesson {
        return { id: Utils.uuid(), name: payload.name }
    }

    protected _editFromPayload(target: ILesson, payload: ILessonPayload): void {
        target.name = payload.name
    }
}
export default ApiLessonMock
