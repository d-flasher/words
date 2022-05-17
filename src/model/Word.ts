import { makeAutoObservable } from 'mobx'

import IEntity from './Entity'

export interface IWordPayload {
    value?: string | null
    translate?: string | null
}

export interface IWord extends IEntity, IWordPayload { }

class Word implements IWord {
    constructor(
        public id: string
    ) {
        makeAutoObservable(this)
    }

    value: string | null = null
    setValue(v: string) { this.value = v }

    translate: string | null = null
    setTranslate(v: string) { this.translate = v }
}
export default Word
