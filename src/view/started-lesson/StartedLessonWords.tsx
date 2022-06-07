import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { FC, useState } from 'react'

import Word from '../../model/word'
import Utils from '../../utils/utils'
import ProgressbarLabel from '../progressbar-label/ProgressbarLabel'
import StartedLessonWord from './StartedLessonWord'

const getAndRemove = (prev: Word | null, words: Word[]) => {
    if (words.length === 0) return null

    let result: Word | null = null
    let remainingTry = 3
    let randomIndex: number = Number.NaN

    while (result === null || (result === prev && remainingTry > 0)) {
        randomIndex = Utils.getRandomNum(0, words.length - 1)
        result = words[randomIndex]
        remainingTry--
    }

    words.splice(randomIndex, 1)
    return result
}

interface IState {
    remainingWords: Word[]
    current: Word | null
    wordQueue: number
    initWordsLength: number
}

const StartedLessonWords: FC<{ words: Word[] }> = ({ words: initWords }) => {
    const [state, setState] = useState<IState>(() => {
        const words = [...initWords, ...initWords, ...initWords]
        const initWordsLength = words.length

        const result = getAndRemove(null, words)
        return {
            remainingWords: words,
            current: result,
            wordQueue: 1,
            initWordsLength: initWordsLength,
        }
    })

    const next = (isError: boolean) => {
        if (isError && state.current) {
            state.initWordsLength++
            state.remainingWords.push(state.current)
        }

        const result = getAndRemove(state.current, state.remainingWords)
        const resultAsData: IState = {
            remainingWords: state.remainingWords,
            current: result,
            wordQueue: state.wordQueue + 1,
            initWordsLength: state.initWordsLength,
        }
        setState(resultAsData)
    }

    return (
        <Stack
            sx={{ height: '100%' }}
        >
            {state.current
                ? <>
                    <ProgressbarLabel
                        value={state.wordQueue}
                        max={state.initWordsLength}
                    />
                    <StartedLessonWord
                        word={state.current}
                        onNext={isError => next(isError)}
                    />
                </>
                : <Alert
                    variant="outlined"
                    severity="success"
                    placeholder="complete alert"
                >
                    Complete
                </Alert>
            }
        </Stack>)
}
export default StartedLessonWords
