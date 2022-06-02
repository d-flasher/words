import { render, screen } from '@testing-library/react'

import TestUtils from '../../utils/test-utils'
import RequiredTextField from './RequiredTextField'

describe('RequiredTextField', () => {
    test('handling value changes', async () => {
        const { rerender } = render(<RequiredTextField value="" />)

        // an error displayed only after interraction
        expect(screen.getByRole('textbox')).toHaveValue('')
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false')

        rerender(<RequiredTextField value="v1" />)
        expect(screen.getByRole('textbox')).toHaveValue('v1')
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false')
    })

    test('interraction', () => {
        const { getByRole } = render(<RequiredTextField />)
        expect(getByRole('textbox')).toHaveValue('')
        expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'false')

        TestUtils.changeInputValue(getByRole('textbox'), 'v1')
        expect(getByRole('textbox')).toHaveValue('v1')
        expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'false')

        TestUtils.changeInputValue(getByRole('textbox'), '')
        expect(getByRole('textbox')).toHaveValue('')
        expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
})
