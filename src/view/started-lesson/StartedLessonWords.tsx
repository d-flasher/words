import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { FC, useState } from 'react'

import { IWordPayload } from '../../model/word'
import Utils from '../../utils/utils'
import ProgressbarLabel from '../progressbar-label/ProgressbarLabel'
import StartedLessonWord from './StartedLessonWord'

export function isEqual_words(a: IWordPayload | null, b: IWordPayload | null): boolean {
    if (a === b) return true
    if (a == null || b == null) return false
    if (
        a.value === b.value
        || a.value === b.translate
        || a.translate === b.value
    ) return true

    return false
}

const getAndRemove = (prev: IWordPayload | null, words: IWordPayload[]) => {
    if (words.length === 0) return null

    let result: IWordPayload | null = null
    let remainingTry = 3
    let randomIndex: number = Number.NaN

    while (result === null || (isEqual_words(result, prev) && remainingTry > 0)) {
        randomIndex = Utils.getRandomNum(0, words.length - 1)
        result = words[randomIndex]
        remainingTry--
    }

    words.splice(randomIndex, 1)
    return result
}

export const getLessonWords = (initWords: IWordPayload[]) => {
    const invertedItems: IWordPayload[] = initWords.map(({ value, translate }) => ({ value: translate, translate: value }))
    return [...initWords, ...initWords, ...invertedItems]
}

interface IState {
    remainingWords: IWordPayload[]
    current: IWordPayload | null
    wordQueue: number
    initWordsLength: number
}

const StartedLessonWords: FC<{ words: IWordPayload[] }> = ({ words: initWords }) => {
    const [state, setState] = useState<IState>(() => {
        const words = getLessonWords(initWords)
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
