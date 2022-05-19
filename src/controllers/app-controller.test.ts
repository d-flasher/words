import AppApiMock from '../api/app-api-mock'
import AppModel from '../model/app-model'
import AppController from './app-controller'

describe('AppController', () => {
    test('default state', () => {
        const controller = new AppController(new AppModel(), new AppApiMock('regular'))
        expect(controller.words == null).not.toBeTruthy()
    })
})
