import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { ReactElement } from 'react'
import { Router } from 'react-router-dom'

import AppModel from '../model/app-model'
import { AppModelContext } from '../view/WordsApp'

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

    static render(target: ReactElement, path: string = '/') {
        const history = createMemoryHistory({ initialEntries: [path] })
        const model = new AppModel()
        const renderRes = render(
            <AppModelContext.Provider value={model}>
                <Router
                    navigator={history}
                    location={path}>
                    {target}
                </Router>
            </AppModelContext.Provider>
        )
        return { ...renderRes, history, model }
    }
}
export default TestUtils
