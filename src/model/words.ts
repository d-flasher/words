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

    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading(value: boolean) { this._isLoading = value }

    add(v: Word) { this._list.push(v) }
    remove(id: string) {
        const index = this._list.findIndex(item => item.id === id)
        if (index >= 0) this._list.splice(index, 1)
    }

    getById(id: string) {
        return this._list.find(item => item.id === id)
    }

    clear() {
        this._list = []
    }
}
export default Words
