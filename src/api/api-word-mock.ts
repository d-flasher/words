import { IWord, IWordPayload } from '../model/word'
import Utils from '../utils/utils'
import { ApiEntityMock } from './api-entity-mock'

class ApiWordMock extends ApiEntityMock<IWord, IWordPayload> {
    protected _createFromPayload(payload: IWordPayload): IWord {
        return { id: Utils.uuid(), value: payload.value, translate: payload.translate }
    }

    protected _editFromPayload(target: IWord, payload: IWordPayload): void {
        target.value = payload.value
        target.translate = payload.translate
    }
}
export default ApiWordMock
