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

const WordItem: FC<{ id: string, divider?: boolean }> = ({ id, divider }) => {
    const { words } = useContext(ModelContext)
    const api = useContext(ApiContext)
    const controller = useContext(ControllerContext)
    const navigate = useNavigate()

    const data = words.getById(id)
    if (data == null) {
        const msg = `<не найдено для id: "${id}">`
        return <span>{msg}</span>
    }

    const onRemoveBtn = async () => {
        try {
            await api.words.remove(id)
        } catch (error) {
            controller.serviceMessages.add(Utils.asError(error).message, 'error')
        }
    }

    const onEditBtn = () => {
        navigate(`edit/${id}`)
    }

    const value = data.value && data.value.length > 0 ? data.value : '<значение пустое>'
    const translate = data.translate && data.translate.length > 0 ? data.translate : '<перевод пустой>'

    return (
        <ListItem
            disableGutters
            divider={divider}
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
                placeholder="word item"
            >
                <ListItemText
                    primary={value}
                    secondary={translate}
                    className="lowercase"
                />
            </ListItemButton>
        </ListItem>
    )
}
export default observer(WordItem)
