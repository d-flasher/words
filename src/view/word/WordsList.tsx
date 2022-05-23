import AddIcon from '@mui/icons-material/Add'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModelContext } from '../WordsApp'
import WordItem from './WordItem'

const WordsList: FC = () => {
    const { words } = useContext(ModelContext)
    const navigate = useNavigate()

    if (words.error) {
        return <Alert severity="error">{words.error.message}</Alert>
    }

    if (words.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                <CircularProgress />
            </Box>
        )
    }

    const onAddBtn = () => {
        navigate('add')
    }

    const list = words.list.map((item, index) => (
        <WordItem
            key={item.id}
            id={item.id}
            divider={index < (words.list.length - 1)}
        ></WordItem>
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
                sx={{ position: 'fixed', bottom: 16, right: 16, }}
                onClick={onAddBtn}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}
export default observer(WordsList)
