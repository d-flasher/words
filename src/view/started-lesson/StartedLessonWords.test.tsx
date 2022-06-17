import { fireEvent, render } from '@testing-library/react'

import { IWordPayload } from '../../model/word'
import TestUtils from '../../utils/test-utils'
import StartedLessonWords, { getLessonWords } from './StartedLessonWords'

describe('StartedLessonWords', () => {
    test('empty words', () => {
        const { queryByPlaceholderText } = render(<StartedLessonWords words={[]} />)
        expect(queryByPlaceholderText('complete alert')).toBeInTheDocument()
    })

    test('getLessonWords', () => {
        const initWords: IWordPayload[] = [
            { value: 'v1', translate: 't1' },
            { value: 'v2', translate: 't2' },
        ]
        const initResult: IWordPayload[] = [
            // firs copy
            { value: 'v1', translate: 't1' },
            { value: 'v2', translate: 't2' },
            // second copy
            { value: 'v1', translate: 't1' },
            { value: 'v2', translate: 't2' },
            // third copy
            { value: 'v1', translate: 't1' },
            { value: 'v2', translate: 't2' },
        ]
        expect(initResult.length).toBe(6)

        const result = getLessonWords(initWords)
        result.forEach(resultItem => {
            const foundIndex = initResult.findIndex(item => item.value === resultItem.value && item.translate === resultItem.translate)
            if (foundIndex >= 0) {
                initResult.splice(foundIndex, 1)
            }
        })

        expect(initResult.length).toBe(0)
    })

    test('regular work', () => {
        const words: IWordPayload[] = [
            { value: 'v1', translate: 't1' },
            { value: 'v2', translate: 't2' },
        ]
        const resultWords: IWordPayload[] = getLessonWords(words)

        const {
            queryByPlaceholderText, getByTestId, getByPlaceholderText, getByLabelText, getByText
        } = render(<StartedLessonWords words={words} />)

        expect(queryByPlaceholderText('complete alert')).not.toBeInTheDocument()

        const length = resultWords.length
        Array(length).fill('').forEach((item, index) => {
            expect(getByText(`${index + 1}/${length}`)).toBeInTheDocument()

            const valueLabel = getByTestId('value-label')
            const translateInput = getByLabelText(/translate/i)

            const resultItem = resultWords.find(item => item.value === valueLabel.innerHTML)

            TestUtils.changeInputValue(translateInput, resultItem!.translate!)
            TestUtils.keyDown_Enter(translateInput)
            fireEvent.click(getByPlaceholderText('next word button'))
        })

        expect(queryByPlaceholderText('complete alert')).toBeInTheDocument()
    })
})
