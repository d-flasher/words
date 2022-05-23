import { fireEvent } from '@testing-library/react'

import ApiWordMock from '../api/api-word-mock'
import Word from '../model/word'
import TestUtils from '../utils/test-utils'
import WordEditor from './WordEditor'

describe('WordEditor', () => {
    const renderEditor = () => {
        const renderRes = TestUtils.render(<WordEditor id="id1"></WordEditor>)
        const entity = new Word('id1')
        entity.setValue('v1')
        entity.setTranslate('t1')
        renderRes.model.words.add(entity)
        return renderRes
    }

    test('view', () => {
        const { getByLabelText, getByPlaceholderText } = renderEditor()

        TestUtils.elIsAvailable(getByLabelText('value'))
        TestUtils.elIsAvailable(getByLabelText('translate'))
        TestUtils.elIsAvailable(getByPlaceholderText('save button'))
        TestUtils.elIsAvailable(getByPlaceholderText('cancel button'))
    })

    test('cancel button', () => {
        const { getByPlaceholderText, history } = renderEditor()
        const btn = getByPlaceholderText('cancel button')

        TestUtils.linkClick(btn, '/words', history)
    })

    test('save button', () => {
        const { getByLabelText, getByPlaceholderText } = renderEditor()
        TestUtils.changeInputValue(getByLabelText('value'), 'v2')
        TestUtils.changeInputValue(getByLabelText('translate'), 't2')

        const btn = getByPlaceholderText('save button')
        const editFn = jest.spyOn(ApiWordMock.prototype, 'edit').mockImplementation(() => Promise.resolve())

        expect(editFn).toBeCalledTimes(0)
        fireEvent.click(btn)
        expect(editFn).toBeCalledTimes(1)
        expect(editFn).toBeCalledWith<Parameters<typeof ApiWordMock.prototype.edit>>('id1', { value: 'v2', translate: 't2' })
    })
})
