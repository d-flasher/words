import { ILesson, ILessonPayload } from '../model/lesson'
import { IWord, IWordPayload } from '../model/word'
import IApiEntity from './api-entity'

interface IApiApp {
    words: IApiEntity<IWord, IWordPayload>
    lessons: IApiEntity<ILesson, ILessonPayload>
}
export default IApiApp
