import Cancel from '@mui/icons-material/Cancel'
import CheckCircle from '@mui/icons-material/CheckCircle'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'

import { IWordPayload } from '../model/word'

type WordFormProps = {
    payload?: IWordPayload,
    onSave: (payload: IWordPayload) => void,
    onCancel: () => void,
}

const WordForm: FC<WordFormProps> = ({ payload, onSave, onCancel }) => {
    const [value, setValue] = useState(payload?.value || '')
    const [translate, setTranslate] = useState(payload?.translate || '')

    useEffect(() => {
        setValue(payload?.value || '')
        setTranslate(payload?.translate || '')
    }, [payload])

    const isSaveDisabled = !Boolean(value && translate)
    const onSaveInner = () => {
        onSave({ value, translate })
    }

    return (
        <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
                <TextField
                    id="value"
                    data-testid="value-input"
                    label="value"
                    type="text"
                    variant="outlined"
                    margin="none"
                    autoFocus
                    sx={{ width: '100%' }}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    id="translate"
                    data-testid="translate-input"
                    label="translate"
                    type="text"
                    variant="outlined"
                    margin="none"
                    sx={{ width: '100%' }}
                    value={translate}
                    onChange={event => setTranslate(event.target.value)}
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
export default observer(WordForm)
