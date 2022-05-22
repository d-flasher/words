import { makeAutoObservable } from 'mobx'

import IEntities from './entities'
import Lesson from './lesson'

class Lessons implements IEntities<Lesson> {
    constructor() {
        makeAutoObservable(this)
    }

    private _list: Lesson[] = [];
    get list(): Readonly<Lesson[]> { return this._list }

    private _error: Error | undefined
    get error() { return this._error }
    set error(value: Error | undefined) { this._error = value }

    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading(value: boolean) { this._isLoading = value }

    add(v: Lesson) { this._list.push(v) }
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
export default Lessons
