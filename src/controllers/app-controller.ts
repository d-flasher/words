import IAppApi from '../api/app-api'
import AppModel from '../model/app-model'
import WordsController from './words-controller'

class AppController {
    constructor(
        model: AppModel,
        api: IAppApi,
    ) {
        this.words = new WordsController(model.words, api.words)
    }

    words: WordsController
}
export default AppController
