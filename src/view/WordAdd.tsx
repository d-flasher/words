import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { IWordPayload } from '../model/word'
import WordForm from './WordForm'
import { ApiContext } from './WordsApp'

const WordAdd: FC = () => {
    const navigate = useNavigate()
    const api = useContext(ApiContext)

    const onSave = async (payload: IWordPayload) => {
        await api.words.create(payload)
        navigate('/words')
    }

    const onCancel = () => {
        navigate('/words')
    }

    return (
        <WordForm
            onSave={onSave}
            onCancel={onCancel}
        ></WordForm>
    )
}
export default observer(WordAdd)
