import AddIcon from '@mui/icons-material/Add'
import Alert from '@mui/material/Alert'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import WordItem from './WordItem'
import { ModelContext } from './WordsApp'

const WordsList: FC = () => {
    const { words } = useContext(ModelContext)
    const navigate = useNavigate()

    if (words.error) {
        return <Alert severity="error">{words.error.message}</Alert>
    }

    const onAddBtn = () => {
        navigate('add')
    }

    const list = words.list.map(item => (
        <WordItem key={item.id} id={item.id}></WordItem>
    ))

    return (
        <div>
            <List
                dense
            >
                {list}
            </List>
            <Fab
                color="primary"
                aria-label="add"
                placeholder="add button"
                sx={{ position: 'absolute', bottom: 16, right: 16, }}
                onClick={onAddBtn}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}
export default observer(WordsList)
