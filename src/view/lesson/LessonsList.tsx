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
import LessonItem from './LessonItem'

const LessonsList: FC = () => {
    const { lessons } = useContext(ModelContext)
    const navigate = useNavigate()

    if (lessons.error) {
        return <Alert severity="error">{lessons.error.message}</Alert>
    }

    if (lessons.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                <CircularProgress />
            </Box>
        )
    }

    const onAddBtn = () => {
        navigate('add')
    }

    const list = lessons.list.map(item => (
        <LessonItem key={item.id} id={item.id}></LessonItem>
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
export default observer(LessonsList)
