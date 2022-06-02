import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Utils from '../../utils/utils'
import { ApiContext, ControllerContext, ModelContext } from '../WordsApp'

const LessonItem: FC<{ id: string }> = ({ id }) => {
    const { lessons } = useContext(ModelContext)
    const api = useContext(ApiContext)
    const controller = useContext(ControllerContext)
    const navigate = useNavigate()

    const data = lessons.getById(id)
    if (data == null) {
        const msg = `<не найдено для id: "${id}">`
        return <span>{msg}</span>
    }

    const onRemoveBtn = async () => {
        try {
            await api.lessons.remove(id)
        } catch (error) {
            controller.serviceMessages.add(Utils.asError(error).message, 'error')
        }
    }

    const onEditBtn = () => {
        navigate(`edit/${id}`)
    }

    const value = data.name && data.name.length > 0 ? data.name : '<имя пустое>'

    return (
        <ListItem
            disableGutters
            divider
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    placeholder="remove button"
                    onClick={() => onRemoveBtn()}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemButton
                onClick={() => onEditBtn()}
                placeholder="edit button"
            >
                <ListItemText
                    primary={value}
                />
            </ListItemButton>
        </ListItem>
    )
}
export default observer(LessonItem)
