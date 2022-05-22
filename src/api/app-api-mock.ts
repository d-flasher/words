import { MockType } from '../utils/common-types'
import { ApiWordMock } from './api-word-mock'

class AppApiMock {
    constructor(
        private _mockType: MockType
    ) { }

    words = new ApiWordMock(this._mockType)
}
export default AppApiMock
