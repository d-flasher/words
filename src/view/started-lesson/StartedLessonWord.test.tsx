import { fireEvent, render } from '@testing-library/react'

import Word from '../../model/word'
import TestUtils from '../../utils/test-utils'
import StartedLessonWord from './StartedLessonWord'

describe('StartedLesson', () => {
    const init = () => {
        const word = new Word('id1')
        word.setValue('v1')
        word.setTranslate('t1')
        const onNext = jest.fn()
        const result = render(<StartedLessonWord word={word} onNext={onNext} />)
        return { ...result, word, onNext }
    }

    test('regular work', () => {
        const { getByTestId, queryByPlaceholderText, getByPlaceholderText, getByLabelText, onNext } = init()

        // DEFAULT STATE

        const valueLabel = getByTestId('value-label')
        expect(valueLabel).toBeInTheDocument()
        expect(valueLabel).toHaveTextContent('v1')

        const translateInput = getByLabelText(/translate/i)
        expect(translateInput).toBeInTheDocument()

        expect(queryByPlaceholderText('next word button')).not.toBeInTheDocument()

        expect(onNext).toHaveBeenCalledTimes(0)

        // INPUT AND ENTER STATE

        TestUtils.changeInputValue(translateInput, 't1')
        TestUtils.keyDown_Enter(translateInput)

        expect(translateInput).not.toBeInTheDocument()
        expect(queryByPlaceholderText('next word button')).toBeInTheDocument()

        // NEXT CLICK STATE

        fireEvent.click(getByPlaceholderText('next word button'))
        expect(onNext).toHaveBeenCalledTimes(1)
        expect(onNext).toHaveBeenCalledWith(false)
    })

    test('inputed an error value', () => {
        const { getByPlaceholderText, getByLabelText, onNext, debug } = init()

        expect(onNext).toHaveBeenCalledTimes(0)

        const translateInput = getByLabelText(/translate/i)
        TestUtils.changeInputValue(translateInput, 't2')
        TestUtils.keyDown_Enter(translateInput)

        fireEvent.click(getByPlaceholderText('next word button'))

        expect(onNext).toHaveBeenCalledTimes(1)
        expect(onNext).toHaveBeenCalledWith(true)
    })
})
