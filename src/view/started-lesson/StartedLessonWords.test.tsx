import { fireEvent, render } from '@testing-library/react'

import { IWordPayload } from '../../model/word'
import TestUtils from '../../utils/test-utils'
import StartedLessonWords from './StartedLessonWords'

describe('StartedLessonWords', () => {
    test('empty words', () => {
        const { queryByPlaceholderText } = render(<StartedLessonWords words={[]} />)
        expect(queryByPlaceholderText('complete alert')).toBeInTheDocument()
    })

    test('regular work', () => {
        const words_ValueTranslate: { [v: string]: string } = { 'v1': 't1', 'v2': 't2' }
        const words: IWordPayload[] = Object.entries(words_ValueTranslate)
            .map(([v, t]) => ({ value: v, translate: t }))

        const {
            queryByPlaceholderText, getByTestId, getByPlaceholderText, getByLabelText, getByText
        } = render(<StartedLessonWords words={words} />)

        expect(queryByPlaceholderText('complete alert')).not.toBeInTheDocument()

        const length = words.length * 3
        Array(length).fill('').forEach((item, index) => {
            expect(getByText(`${index + 1}/${length}`)).toBeInTheDocument()

            const valueLabel = getByTestId('value-label')
            const translateInput = getByLabelText(/translate/i)
            TestUtils.changeInputValue(translateInput, words_ValueTranslate[valueLabel.innerHTML])
            TestUtils.keyDown_Enter(translateInput)
            fireEvent.click(getByPlaceholderText('next word button'))
        })

        expect(queryByPlaceholderText('complete alert')).toBeInTheDocument()
    })
})
