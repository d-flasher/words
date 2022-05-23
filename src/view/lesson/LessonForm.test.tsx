import { fireEvent } from '@testing-library/react'

import { ILessonPayload } from '../../model/lesson'
import TestUtils from '../../utils/test-utils'
import LessonForm from './LessonForm'

describe('LessonForm', () => {
    const init = (payload?: ILessonPayload) => {
        const onSaveFn = jest.fn()
        const onCancelFn = jest.fn()
        return {
            ...TestUtils.render(
                <LessonForm
                    payload={payload}
                    onSave={onSaveFn}
                    onCancel={onCancelFn}>
                </LessonForm>
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
        testInput('name')
    })

    test('view not null', () => {
        const { getByLabelText } = init({ name: 'n1' })

        const testInput = (label: string, value: string) => {
            const inputEl = getByLabelText(label)
            TestUtils.elIsAvailable(inputEl)
            expect(inputEl).toHaveValue(value)
        }
        testInput('name', 'n1')
    })

    test('inputs interraction', () => {
        const { getByLabelText } = init({ name: 'n1' })

        const testInput = (label: string, initValue: string) => {
            const input = getByLabelText(label)
            expect(input).toHaveValue(initValue)

            TestUtils.changeInputValue(input, 'newVal')
            expect(input).toHaveValue('newVal')

            TestUtils.changeInputValue(input, '')
            expect(input).toHaveValue('')
        }
        testInput('name', 'n1')
    })

    test.each`
        a       | saveBtn  | cancelBtn
        ${null} | ${false} | ${true}
        ${''}   | ${false} | ${true}
        ${'n1'} | ${true}  | ${true}
    `('saveBtn: "$saveBtn", cancelBtn: "$cancelBtn" (name: "$a")', ({ a, saveBtn, cancelBtn }) => {
        const { getByPlaceholderText } = init({ name: a })
        TestUtils.elIsAvailable(getByPlaceholderText('save button'), saveBtn)
        TestUtils.elIsAvailable(getByPlaceholderText('cancel button'), cancelBtn)
    })

    test('cancel button', () => {
        const { getByPlaceholderText, onCancelFn } = init({ name: '' })
        const btn = getByPlaceholderText('cancel button')

        expect(onCancelFn).toBeCalledTimes(0)
        fireEvent.click(btn)
        expect(onCancelFn).toBeCalledTimes(1)
    })

    test('save button', () => {
        const { getByPlaceholderText, onSaveFn } = init({ name: 'n1' })
        const btn = getByPlaceholderText('save button')

        expect(onSaveFn).toBeCalledTimes(0)
        fireEvent.click(btn)
        expect(onSaveFn).toBeCalledTimes(1)
        expect(onSaveFn).toHaveBeenCalledWith<[ILessonPayload]>({ name: 'n1' })
    })
})
