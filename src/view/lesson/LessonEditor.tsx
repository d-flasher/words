import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ILessonPayload } from '../../model/lesson'
import Utils from '../../utils/utils'
import { ApiContext, ControllerContext, ModelContext } from '../WordsApp'
import LessonForm from './LessonForm'

const LessonEditor: FC<{ id: string }> = ({ id }) => {
    const navigate = useNavigate()
    const { lessons } = useContext(ModelContext)
    const api = useContext(ApiContext)
    const { serviceMessages } = useContext(ControllerContext)

    const entity = lessons.getById(id)
    if (entity == null) {
        const msg = `<не найдено для id: "${id}">`
        return <span>{msg}</span>
    }

    const onSave = async (payload: ILessonPayload) => {
        try {
            navigate('/lessons')
            await api.lessons.edit(id, payload)
        } catch (error) {
            serviceMessages.add(Utils.asError(error).message, 'error')
        }
    }

    const onCancel = () => {
        navigate('/lessons')
    }

    return (
        <LessonForm
            payload={entity}
            onSave={onSave}
            onCancel={onCancel}>
        </LessonForm>
    )
}
export default observer(LessonEditor)
