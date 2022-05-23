import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { IWordPayload } from '../../model/word'
import Utils from '../../utils/utils'
import { ApiContext, ControllerContext } from '../WordsApp'
import WordForm from './WordForm'

const WordAdd: FC = () => {
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const { serviceMessages } = useContext(ControllerContext)

    const onSave = async (payload: IWordPayload) => {
        try {
            navigate('/words')
            await api.words.create(payload)
        } catch (error) {
            serviceMessages.add(Utils.asError(error).message, 'error')
        }
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
