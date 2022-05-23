import { MockType } from '../utils/common-types'
import IApiApp from './api-app'
import ApiWordMock from './api-word-mock'

class ApiAppMock implements IApiApp {
    constructor(
        private _mockType: MockType
    ) { }

    words = new ApiWordMock(this._mockType)
}
export default ApiAppMock
