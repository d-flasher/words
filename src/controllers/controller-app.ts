import IApiApp from '../api/api-app'
import AppModel from '../model/app-model'
import ControllerWord from './controller-word'
import ServiceMessages from './service-messages'

class ControllerApp {
    constructor(
        model: AppModel,
        api: IApiApp,
    ) {
        this.words = new ControllerWord(model.words, api.words)
    }

    words: ControllerWord
    serviceMessages = new ServiceMessages()
}
export default ControllerApp
