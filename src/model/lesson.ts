import { makeAutoObservable } from 'mobx'

import IEntity from './entity'

export type List_WordsIds = string[] | undefined

export interface ILessonPayload {
    name?: string | null
    wordsIds?: List_WordsIds
}

export interface ILesson extends IEntity, ILessonPayload { }

class Lesson implements ILesson {
    constructor(
        public id: string
    ) {
        makeAutoObservable(this)
    }

    name: string | null = null
    setName(v: string) { this.name = v }

    wordsIds: List_WordsIds
    setWordsIds(value: string[]) { this.wordsIds = value }
}
export default Lesson
