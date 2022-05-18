import AddIcon from '@mui/icons-material/Add'
import Alert from '@mui/material/Alert'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'

import { AppModelContext } from '../model/app-model'
import WordItem from './WordItem'

const WordsList: FC = () => {
    const { words } = useContext(AppModelContext)
    if (words.error) {
        return <Alert severity="error">{words.error.message}</Alert>
    }

    const list = words.list.map(item => (
        <WordItem key={item.id} id={item.id}></WordItem>
    ))

    return <div>
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
        >
            <AddIcon />
        </Fab>
    </div>
}

export default observer(WordsList)
