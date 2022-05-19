import { IWord, IWordPayload } from '../model/word'
import IApiEntity from './api-entity'

interface IAppApi {
    words: IApiEntity<IWord, IWordPayload>
}
export default IAppApi
