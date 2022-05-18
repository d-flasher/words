import AppModel from './app-model'

describe('AppModel', () => {
    test('default state', () => {
        const appModel = new AppModel()
        expect(appModel.words == null).not.toBeTruthy()
    })
})
