import IApiApp from '../api/api-app'
import AppModel from '../model/app-model'
import ControllerLesson from './controller-lesson'
import ControllerWord from './controller-word'
import ServiceMessages from './service-messages'

class ControllerApp {
    constructor(
        model: AppModel,
        api: IApiApp,
    ) {
        this.words = new ControllerWord(model.words, api.words)
        this.lessons = new ControllerLesson(model.lessons, api.lessons)
    }

    words: ControllerWord
    lessons: ControllerLesson
    serviceMessages = new ServiceMessages()
}
export default ControllerApp
