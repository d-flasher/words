import AppApiMock from './app-api-mock'

describe('AppApiMock', () => {
    test('default state', () => {
        const api = new AppApiMock('regular')
        expect(api.words == null).not.toBeTruthy()
    })
})
