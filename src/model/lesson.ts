import { makeAutoObservable } from 'mobx'

import IEntity from './entity'

export interface ILessonPayload {
    name?: string | null
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
}
export default Lesson
