import Cancel from '@mui/icons-material/Cancel'
import CheckCircle from '@mui/icons-material/CheckCircle'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'

import { ILessonPayload } from '../../model/lesson'

type LessonFormProps = {
    payload?: ILessonPayload,
    onSave: (payload: ILessonPayload) => void,
    onCancel: () => void,
}

const LessonForm: FC<LessonFormProps> = ({ payload, onSave, onCancel }) => {
    const [name, setName] = useState(payload?.name || '')

    useEffect(() => {
        setName(payload?.name || '')
    }, [payload])

    const isSaveDisabled = !Boolean(name)
    const onSaveInner = () => {
        onSave({ name })
    }

    return (
        <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
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
            </Grid>
            <Grid item sm={2} xs={3}>
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
            </Grid>
            <Grid item sm={2} xs={3}>
                <Button
                    type="button"
                    placeholder="cancel button"
                    size="large"
                    startIcon={<Cancel />}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
    )
}
export default observer(LessonForm)
