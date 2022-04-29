import { render } from '@testing-library/react'

import App from './App'

describe('App', () => {
    test('view', () => {
        const { queryByText } = render(<App />)
        expect(queryByText('Word app')).toBeInTheDocument()
    })
})
