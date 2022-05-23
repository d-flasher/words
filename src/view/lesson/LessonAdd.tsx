import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ILessonPayload } from '../../model/lesson'
import Utils from '../../utils/utils'
import { ApiContext, ControllerContext } from '../WordsApp'
import LessonForm from './LessonForm'

const LessonAdd: FC = () => {
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const { serviceMessages } = useContext(ControllerContext)

    const onSave = async (payload: ILessonPayload) => {
        try {
            navigate('/lessons')
            await api.lessons.create(payload)
        } catch (error) {
            serviceMessages.add(Utils.asError(error).message, 'error')
        }
    }

    const onCancel = () => {
        navigate('/lessons')
    }

    return (
        <LessonForm
            onSave={onSave}
            onCancel={onCancel}
        ></LessonForm>
    )
}
export default observer(LessonAdd)
