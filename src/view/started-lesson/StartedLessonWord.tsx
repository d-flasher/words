import NavigateNext from '@mui/icons-material/NavigateNext'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useRef, useState } from 'react'

import Word from '../../model/word'
import Utils from '../../utils/utils'
import RequiredTextField from '../required-textfield/RequiredTextField'

interface IStartedLessonWordProps {
    word: Word
    onNext: (isError: boolean) => void
}

const StartedLessonWord: FC<IStartedLessonWordProps> = ({ word: currentWord, onNext }) => {
    const [isNext, setIsNext] = useState<{ isError: boolean } | null>(null)
    const [translate, setTranslate] = useState<string>('')
    const inputErrorRef = useRef<boolean>(false)

    const onNextClick = () => {
        if (inputErrorRef.current) {
            return
        }

        if (isNext == null) {
            const isError = !Utils.isStringsEqual(translate, currentWord.translate)
            setIsNext({ isError: isError })
        } else {
            setIsNext(null)
            setTranslate('')
            onNext(isNext.isError)
        }
    }

    return (
        <Stack
            spacing={2}
            justifyContent="space-between"
            alignItems="stretch"
            sx={{ height: '100%' }}
        >
            <Paper
                variant="outlined"
            >
                <Typography
                    variant="h4"
                    data-testid="value-label"
                    sx={{ textAlign: 'center' }}
                >
                    {currentWord.value}
                </Typography>
            </Paper>

            <Box sx={{ height: '100%' }} />

            {isNext == null
                ? <RequiredTextField
                    required
                    value={translate}
                    label="Translate"
                    variant="outlined"
                    onChange={event => setTranslate(event.target.value)}
                    autoFocus
                    onKeyDown={event => { if (event.key === 'Enter') onNextClick() }}
                    onErrorChange={isError => inputErrorRef.current = isError}
                />
                : <>
                    {isNext.isError &&
                        <Typography
                            variant="h6"
                            data-testid="value-label"
                            sx={{ textAlign: 'center' }}
                        >
                            {currentWord.translate}
                        </Typography>
                    }
                    <Alert
                        variant="outlined"
                        severity={isNext.isError ? 'error' : 'success'}
                    >
                        {isNext.isError ? <s>{translate}</s> : translate}
                    </Alert>
                    <Button
                        size="large"
                        variant="contained"
                        endIcon={<NavigateNext />}
                        color="info"
                        placeholder="next word button"
                        onClick={() => onNextClick()}
                        ref={node => setTimeout(() => node?.focus(), 100)}
                    />
                </>
            }
        </Stack >
    )
}
export default StartedLessonWord
