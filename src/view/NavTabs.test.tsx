import TestUtils from '../utils/test-utils'
import NavTabs, { getNavTabs } from './NavTabs'

describe('IndexOutlet', () => {

    const tabs = getNavTabs()

    test.each`
        path                | selectedTab
        ${'/qwerty'}        | ${'404'}
        ${'/'}              | ${'index'}

        ${'/words'}         | ${'words'}
        ${'/words/add'}     | ${'words'}
        ${'/words/edit'}    | ${'words'}

        ${'/lessons'}         | ${'lessons'}
        ${'/lessons/add'}     | ${'lessons'}
        ${'/lessons/edit'}    | ${'lessons'}
    `('Tab "$selectedTab" selected for path "$path"', ({ path, selectedTab }) => {
        const { getByPlaceholderText } = TestUtils.render(<NavTabs></NavTabs>, path)
        tabs.forEach(tab => {
            const tabEl = getByPlaceholderText(tab.placeholder)
            expect(tabEl).toHaveAttribute('aria-selected', String(tab.label === selectedTab))
        })
    })
})
