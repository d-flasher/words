import AppModel from './app-model'

describe('AppModel', () => {
    test('default state', () => {
        const model = new AppModel()
        expect(model.words == null).not.toBeTruthy()
        expect(model.lessons == null).not.toBeTruthy()
    })
})
