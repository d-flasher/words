import { render, screen } from '@testing-library/react'

import ProgressbarLabel from './ProgressbarLabel'

describe('ProgressbarLabel', () => {
    test('regular', () => {
        const { rerender } = render(<ProgressbarLabel value={0} max={4} />)

        const check = (progressValue: string, label: string) => {
            const progressbar = screen.getByRole('progressbar')
            expect(progressbar).toHaveAttribute('aria-valuemin', '0')
            expect(progressbar).toHaveAttribute('aria-valuenow', progressValue)
            expect(progressbar).toHaveAttribute('aria-valuemax', '100')

            expect(screen.queryByText(label)).toBeInTheDocument()
        }

        check('0', '0/4')

        rerender(<ProgressbarLabel value={1} max={4} />)
        check('25', '1/4')

        rerender(<ProgressbarLabel value={2} max={4} />)
        check('50', '2/4')

        rerender(<ProgressbarLabel value={2} max={0} />)
        check('100', '2/0')
    })
})
