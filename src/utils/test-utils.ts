import { fireEvent } from '@testing-library/react'

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
}
export default TestUtils
