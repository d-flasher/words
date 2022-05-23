import ApiAppMock from './api-app-mock'

describe('ApiAppMock', () => {
    test('default state', () => {
        const api = new ApiAppMock('regular')
        expect(api.words == null).not.toBeTruthy()
        expect(api.lessons == null).not.toBeTruthy()
    })
})
