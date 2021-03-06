import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { ReactElement } from 'react'
import { Router } from 'react-router-dom'

import ApiAppMock from '../api/api-app-mock'
import ControllerApp from '../controllers/controller-app'
import AppModel from '../model/app-model'
import { ApiContext, ControllerContext, ModelContext } from '../view/WordsApp'
import { MockType } from './common-types'

class TestUtils {

    static elIsAvailable(el: HTMLElement, isEnabled = true) {
        expect(el).toBeInTheDocument()
        expect(el).toBeVisible()
        if (isEnabled) expect(el).toBeEnabled()
        else expect(el).toBeDisabled()
    }

    static changeInputValue(el: HTMLElement, newValue: string | number) {
        fireEvent.change(el, { target: { value: newValue } })
    }

    static render(target: ReactElement, path: string = '/', mockType: MockType = 'regular') {
        const history = createMemoryHistory({ initialEntries: [path] })
        const model = new AppModel()
        const api = new ApiAppMock(mockType)
        const controller = new ControllerApp(model, api)
        const renderRes = render(
            <ModelContext.Provider value={model}>
                <ApiContext.Provider value={api}>
                    <ControllerContext.Provider value={controller}>
                        <Router
                            navigator={history}
                            location={path}>
                            {target}
                        </Router>
                    </ControllerContext.Provider>
                </ApiContext.Provider>
            </ModelContext.Provider>
        )
        return { ...renderRes, history, model, api, controller }
    }

    static linkClick(el: HTMLElement, path: string, history: MemoryHistory) {
        expect(history.location.pathname).not.toBe(path)
        fireEvent.click(el)
        expect(history.location.pathname).toBe(path)
    }

    static keyDown_Enter(el: HTMLElement) {
        fireEvent.keyDown(el, { key: 'Enter' })
    }
}
export default TestUtils
