import Word, { IWord, IWordPayload } from '../model/word'
import Words from '../model/words'
import ControllerEntity from './controller-entity'

class ControllerWord extends ControllerEntity<Words, Word, IWord, IWordPayload> {
    protected _createEntity(data: IWord): Word {
        const entity = new Word(data.id)
        if (data.value) entity.setValue(data.value)
        if (data.translate) entity.setTranslate(data.translate)
        return entity
    }

    protected _editEntity(target: Word, data: IWord): void {
        if (data.value) target.setValue(data.value)
        if (data.translate) target.setTranslate(data.translate)
    }

    protected _removeEntity(data: IWord): void {
        this._model.remove(data.id)
    }
}
export default ControllerWord
