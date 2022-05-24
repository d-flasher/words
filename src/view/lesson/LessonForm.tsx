import Cancel from '@mui/icons-material/Cancel'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { Paper } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'

import { ILessonPayload, List_WordsIds } from '../../model/lesson'
import WordsSelectList from '../words-select-list/WordsSelectList'

type LessonFormProps = {
    payload?: ILessonPayload,
    onSave: (payload: ILessonPayload) => void,
    onCancel: () => void,
}

const LessonForm: FC<LessonFormProps> = ({ payload, onSave, onCancel }) => {
    const [name, setName] = useState(payload?.name || '')
    const [wordsIds, setWordsIds] = useState<List_WordsIds>(payload?.wordsIds)

    useEffect(() => {
        setName(payload?.name || '')
        setWordsIds(payload?.wordsIds)
    }, [payload])

    const isSaveDisabled = !Boolean(name)
    const onSaveInner = () => {
        onSave({ name, wordsIds })
    }

    return (
        <Stack
            sx={{ maxHeight: '77vh' }}
            spacing={2}
        >
            <TextField
                id="name"
                data-testid="value-input"
                label="name"
                type="text"
                variant="outlined"
                margin="none"
                autoFocus
                sx={{ width: '100%' }}
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <Paper
                sx={{ overflowY: 'auto' }}
                variant="outlined"
            >
                <WordsSelectList
                    wordsIds={wordsIds}
                    onChange={value => setWordsIds(value)}
                />
            </Paper>
            <Stack
                direction='row'
            >
                <Button
                    type="button"
                    placeholder="save button"
                    disabled={isSaveDisabled}
                    size="large"
                    startIcon={<CheckCircle />}
                    onClick={onSaveInner}
                >
                    Save
                </Button>
                <Button
                    type="button"
                    placeholder="cancel button"
                    size="large"
                    startIcon={<Cancel />}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </Stack>
        </Stack>
    )
}
export default observer(LessonForm)
