import ApiAppMock from '../api/api-app-mock'
import AppModel from '../model/app-model'
import AppController from './app-controller'

describe('AppController', () => {
    test('default state', () => {
        const controller = new AppController(new AppModel(), new ApiAppMock('regular'))
        expect(controller.words == null).not.toBeTruthy()
        expect(controller.serviceMessages == null).not.toBeTruthy()
    })
})
