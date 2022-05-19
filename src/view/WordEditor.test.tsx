import { fireEvent } from '@testing-library/react'

import { ApiEntityMock } from '../api/api-entity-mock'
import Word from '../model/word'
import TestUtils from '../utils/test-utils'
import WordEditor from './WordEditor'

describe('WordEditor', () => {
    const renderEditor = () => {
        const renderRes = TestUtils.render(<WordEditor id="id1"></WordEditor>)
        const word = new Word('id1')
        word.setValue('v1')
        word.setTranslate('t1')
        renderRes.model.words.add(word)
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
        const editWordFn = jest.spyOn(ApiEntityMock.prototype, 'edit').mockImplementation(() => Promise.resolve())

        expect(editWordFn).toBeCalledTimes(0)
        fireEvent.click(btn)
        expect(editWordFn).toBeCalledTimes(1)
        expect(editWordFn).toBeCalledWith<Parameters<typeof ApiEntityMock.prototype.edit>>('id1', { value: 'v2', translate: 't2' })
    })
})
