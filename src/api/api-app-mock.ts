import { MockType } from '../utils/common-types'
import IApiApp from './api-app'
import ApiLessonMock from './api-lesson-mock'
import ApiWordMock from './api-word-mock'

class ApiAppMock implements IApiApp {
    constructor(
        private _mockType: MockType
    ) { }

    words = new ApiWordMock(this._mockType)
    lessons = new ApiLessonMock(this._mockType)
}
export default ApiAppMock
