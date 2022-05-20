import IAppApi from '../api/app-api'
import AppModel from '../model/app-model'
import ServiceMessages from './service-messages'
import WordsController from './words-controller'

class AppController {
    constructor(
        model: AppModel,
        api: IAppApi,
    ) {
        this.words = new WordsController(model.words, api.words)
    }

    words: WordsController
    serviceMessages = new ServiceMessages()
}
export default AppController
