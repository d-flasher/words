import { IWord, IWordPayload } from '../model/word'
import IApiEntity from './api-entity'

interface IApiApp {
    words: IApiEntity<IWord, IWordPayload>
}
export default IApiApp
