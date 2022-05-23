import ApiAppMock from '../api/api-app-mock'
import AppModel from '../model/app-model'
import ControllerApp from './controller-app'

describe('ControllerApp', () => {
    test('default state', () => {
        const controller = new ControllerApp(new AppModel(), new ApiAppMock('regular'))
        expect(controller.words == null).not.toBeTruthy()
        expect(controller.lessons == null).not.toBeTruthy()
        expect(controller.serviceMessages == null).not.toBeTruthy()
    })
})
