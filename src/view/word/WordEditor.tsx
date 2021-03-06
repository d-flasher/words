import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { IWordPayload } from '../../model/word'
import Utils from '../../utils/utils'
import { ApiContext, ControllerContext, ModelContext } from '../WordsApp'
import WordForm from './WordForm'

const WordEditor: FC<{ id: string }> = ({ id }) => {
    const navigate = useNavigate()
    const { words } = useContext(ModelContext)
    const api = useContext(ApiContext)
    const { serviceMessages } = useContext(ControllerContext)

    const entity = words.getById(id)
    if (entity == null) {
        const msg = `<не найдено для id: "${id}">`
        return <span>{msg}</span>
    }

    const onSave = async (payload: IWordPayload) => {
        try {
            navigate('/words')
            await api.words.edit(id, payload)
        } catch (error) {
            serviceMessages.add(Utils.asError(error).message, 'error')
        }
    }

    const onCancel = () => {
        navigate('/words')
    }

    return (
        <WordForm
            payload={entity}
            onSave={onSave}
            onCancel={onCancel}>
        </WordForm>
    )
}
export default observer(WordEditor)
