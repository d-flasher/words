import Word, { IWord, IWordPayload } from '../model/word'
import Words from '../model/words'
import EntityController from './entity-controller'

class WordsController extends EntityController<Words, Word, IWord, IWordPayload> {
    protected _createEntity(data: IWord): Word {
        const word = new Word(data.id)
        if (data.value) word.setValue(data.value)
        if (data.translate) word.setTranslate(data.translate)
        return word
    }

    protected _editEntity(target: Word, data: IWord): void {
        if (data.value) target.setValue(data.value)
        if (data.translate) target.setTranslate(data.translate)
    }
}
export default WordsController
