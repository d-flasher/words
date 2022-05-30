import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'

import { List_WordsIds } from '../../model/lesson'
import { IWord } from '../../model/word'
import { ModelContext } from '../WordsApp'

interface IWordSelectItemProps {
    divider: boolean
    word: IWord
    selected: boolean
    onClick: () => void
}

const WordSelectItem: FC<IWordSelectItemProps> = ({ divider, word, selected, onClick }) => {
    return (
        <ListItem
            divider={divider}
            data-testid={word.id}
            disableGutters
        >
            <ListItemButton
                onClick={onClick}
                dense
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={selected}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': word.id }}
                    />
                </ListItemIcon>
                <ListItemText
                    id={word.id}
                    primary={word.value}
                    secondary={word.translate}
                />
            </ListItemButton>
        </ListItem>
    )
}

interface IWordsSelectListProps {
    wordsIds: List_WordsIds
    onChange: (wordsIds: List_WordsIds) => void
}

const WordsSelectList: FC<IWordsSelectListProps> = ({ wordsIds, onChange }) => {
    const { words } = useContext(ModelContext)

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

    const selectedWords = wordsIds ? [...wordsIds] : []

    const onItemClick = (id: string) => {
        const currentIndex = selectedWords.indexOf(id)
        if (currentIndex === -1) {
            selectedWords.push(id)
        } else {
            selectedWords.splice(currentIndex, 1)
        }
        onChange(selectedWords.length > 0 ? selectedWords : undefined)
    }

    const list = words.list.map((item, index) => (
        <WordSelectItem
            key={item.id}
            divider={index < words.list.length - 1}
            word={item}
            selected={selectedWords.indexOf(item.id) !== -1}
            onClick={() => onItemClick(item.id)}
        />
    ))

    return (
        <div>
            <List
                dense
                disablePadding
            >
                {list}
            </List>
        </div>
    )
}
export default observer(WordsSelectList)
