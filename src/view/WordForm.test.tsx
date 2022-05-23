import { fireEvent } from '@testing-library/react'

import { IWordPayload } from '../model/word'
import TestUtils from '../utils/test-utils'
import WordForm from './WordForm'

describe('WordForm', () => {
    const init = (payload?: IWordPayload) => {
        const onSaveFn = jest.fn()
        const onCancelFn = jest.fn()
        return {
            ...TestUtils.render(
                <WordForm
                    payload={payload}
                    onSave={onSaveFn}
                    onCancel={onCancelFn}>
                </WordForm>
            ),
            onSaveFn, onCancelFn,
        }
    }

    test('view null', () => {
        const { getByLabelText } = init(undefined)

        const testInput = (label: string) => {
            const inputEl = getByLabelText(label)
            TestUtils.elIsAvailable(inputEl)
            expect(inputEl).toHaveValue('')
        }
        testInput('value')
        testInput('translate')
    })

    test('view not null', () => {
        const { getByLabelText } = init({ value: 'v1', translate: 't1' })

        const testInput = (label: string, value: string) => {
            const inputEl = getByLabelText(label)
            TestUtils.elIsAvailable(inputEl)
            expect(inputEl).toHaveValue(value)
        }
        testInput('value', 'v1')
        testInput('translate', 't1')
    })

    test('inputs interraction', () => {
        const { getByLabelText } = init({ value: 'v1', translate: 't1' })

        const testInput = (label: string, initValue: string) => {
            const input = getByLabelText(label)
            expect(input).toHaveValue(initValue)

            TestUtils.changeInputValue(input, 'newVal')
            expect(input).toHaveValue('newVal')

            TestUtils.changeInputValue(input, '')
            expect(input).toHaveValue('')
        }
        testInput('value', 'v1')
        testInput('translate', 't1')
    })

    test.each`
        a       | b       | saveBtn  | cancelBtn
        ${null} | ${null} | ${false} | ${true}
        ${''}   | ${''}   | ${false} | ${true}
        ${'v1'} | ${''}   | ${false} | ${true}
        ${''}   | ${'t1'} | ${false} | ${true}
        ${'v1'} | ${'t1'} | ${true}  | ${true}
    `('saveBtn: "$saveBtn", cancelBtn: "$cancelBtn" (value: "$a", translate: "$b")', ({ a, b, saveBtn, cancelBtn }) => {
        const { getByPlaceholderText } = init({ value: a, translate: b })
        TestUtils.elIsAvailable(getByPlaceholderText('save button'), saveBtn)
        TestUtils.elIsAvailable(getByPlaceholderText('cancel button'), cancelBtn)
    })

    test('cancel button', () => {
        const { getByPlaceholderText, onCancelFn } = init({ value: '', translate: '' })
        const btn = getByPlaceholderText('cancel button')

        expect(onCancelFn).toBeCalledTimes(0)
        fireEvent.click(btn)
        expect(onCancelFn).toBeCalledTimes(1)
    })

    test('save button', () => {
        const { getByPlaceholderText, onSaveFn } = init({ value: 'v1', translate: 't1' })
        const btn = getByPlaceholderText('save button')

        expect(onSaveFn).toBeCalledTimes(0)
        fireEvent.click(btn)
        expect(onSaveFn).toBeCalledTimes(1)
        expect(onSaveFn).toHaveBeenCalledWith<[IWordPayload]>({ value: 'v1', translate: 't1' })
    })
})
