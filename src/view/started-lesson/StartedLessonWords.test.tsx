import { fireEvent, render } from '@testing-library/react'

import Word from '../../model/word'
import TestUtils from '../../utils/test-utils'
import StartedLessonWords from './StartedLessonWords'

describe('StartedLessonWords', () => {
    test('empty words', () => {
        const { queryByPlaceholderText } = render(<StartedLessonWords words={[]} />)
        expect(queryByPlaceholderText('complete alert')).toBeInTheDocument()
    })

    test('regular work', () => {
        const wordsRaw = ['1', '2']
        const words: Word[] = wordsRaw.map(item => {
            const result = new Word('id' + item)
            result.setValue(item)
            result.setTranslate(item)
            return result
        })

        const {
            queryByPlaceholderText, getByTestId, getByPlaceholderText, getByLabelText, getByText
        } = render(<StartedLessonWords words={words} />)

        expect(queryByPlaceholderText('complete alert')).not.toBeInTheDocument()

        Array(6).fill('').forEach((item, index) => {
            expect(getByText(`${index + 1}/6`)).toBeInTheDocument()

            const valueLabel = getByTestId('value-label')
            const translateInput = getByLabelText(/translate/i)
            TestUtils.changeInputValue(translateInput, valueLabel.innerHTML)
            TestUtils.keyDown_Enter(translateInput)
            fireEvent.click(getByPlaceholderText('next word button'))
        })

        expect(queryByPlaceholderText('complete alert')).toBeInTheDocument()
    })
})
