import { makeAutoObservable } from 'mobx'

import IEntities from './entities'
import Word from './word'

class Words implements IEntities<Word> {
    constructor() {
        makeAutoObservable(this)
    }

    private _list: Word[] = [];
    get list(): Readonly<Word[]> { return this._list }

    private _error: Error | undefined
    get error() { return this._error }
    set error(value: Error | undefined) { this._error = value }

    add(v: Word) { this._list.push(v) }
    remove(v: Word) {
        const index = this._list.indexOf(v)
        this._list.splice(index, 1)
    }

    getById(wordId: string) {
        return this._list.find(word => word.id === wordId)
    }
}
export default Words
