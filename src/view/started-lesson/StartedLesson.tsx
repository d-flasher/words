import CloseOutlined from '@mui/icons-material/CloseOutlined'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Word from '../../model/word'
import { ModelContext } from '../WordsApp'
import StartedLessonWords from './StartedLessonWords'

const StartedLesson: FC<{ id: string }> = ({ id }) => {
    const navigate = useNavigate()
    const { lessons, words } = useContext(ModelContext)
    const [wordsModels, setWordsModels] = useState<Word[] | null>(null)
    useEffect(() => {
        return autorun(() => {
            const lesson = lessons.getById(id)
            if (lesson == null || lesson.wordsIds == null || lesson.wordsIds.length === 0) {
                setWordsModels(null)
            } else {
                const wordsModels = lesson.wordsIds
                    .map(id => words.getById(id))
                    .filter(word => word != null)
                setWordsModels(wordsModels.length ? wordsModels as Word[] : null)
            }
        })
    }, [id])

    return (
        <Stack
            sx={{ height: 'calc(100vh - 73px)' }}
        >
            <IconButton
                aria-label="delete"
                sx={{ alignSelf: 'flex-end' }}
                onClick={() => navigate('/lessons')}
            >
                <CloseOutlined />
            </IconButton>
            <Paper
                variant="outlined"
                sx={{ p: '10px 10px 30px 10px', height: '100%' }}
            >
                {wordsModels
                    ? <StartedLessonWords words={wordsModels} />
                    : <Alert severity="error">Lesson id: "{id}" is empty</Alert>
                }
            </Paper>
        </Stack>
    )
}
export default observer(StartedLesson)
