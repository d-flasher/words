import { fireEvent, render } from '@testing-library/react'

import { IWordPayload } from '../../model/word'
import TestUtils from '../../utils/test-utils'
import StartedLessonWords, { getLessonWords, isEqual_words } from './StartedLessonWords'

describe('StartedLessonWords', () => {
    test.each`
        a               | b               | result
        ${null}         | ${null}         | ${true}
        ${null}         | ${['v1', 't1']} | ${false}
        ${['v1', 't1']} | ${null}         | ${false}

        ${['v1', 't1']} | ${['v2', 't2']} | ${false}
        ${['v1', 't1']} | ${['v1', 't1']} | ${true}
        ${['v1', 't1']} | ${['t1', 'v1']} | ${true}
    `('isEqual_words', ({ a, b, result }) => {
        const wordA = a ? { value: a[0], translate: a[1] } : null
        const wordB = b ? { value: b[0], translate: b[1] } : null
        expect(isEqual_words(wordA, wordB) === result).toBeTruthy()
    })

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
            // inverted copy (value => translate, translate => value)
            { value: 't1', translate: 'v1' },
            { value: 't2', translate: 'v2' },
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
