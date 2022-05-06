import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'

import { AppModelContext } from '../model/AppModel'

const WordItem: FC<{ id: string }> = ({ id }) => {
    const { words } = useContext(AppModelContext)

    const data = words.getWordById(id)
    if (data == null) {
        const msg = `<не найдено для id: "${id}">`
        return <span>{msg}</span>
    }

    const value = data.value && data.value.length > 0 ? data.value : '<значение пустое>'
    const translate = data.translate && data.translate.length > 0 ? data.translate : '<перевод пустой>'

    return (
        <ListItem
            divider
        >
            <ListItemButton
                placeholder="word item"
            >
                <ListItemText
                    primary={value}
                    secondary={translate}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default observer(WordItem)
