import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { IWordPayload } from '../model/word'
import WordForm from './WordForm'
import { ApiContext, ModelContext } from './WordsApp'

const WordEditor: FC<{ id: string }> = ({ id }) => {
    const navigate = useNavigate()
    const { words } = useContext(ModelContext)
    const api = useContext(ApiContext)

    const word = words.getById(id)
    if (word == null) {
        const msg = `<не найдено для id: "${id}">`
        return <span>{msg}</span>
    }

    const onSave = (payload: IWordPayload) => {
        api.words.edit(id, payload)
    }

    const onCancel = () => {
        navigate('/words')
    }

    return (
        <WordForm
            payload={word}
            onSave={onSave}
            onCancel={onCancel}>
        </WordForm>
    )
}
export default observer(WordEditor)
