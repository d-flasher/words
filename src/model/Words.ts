import { makeAutoObservable } from 'mobx'

import Word from './Word'

class Words {
    constructor() {
        makeAutoObservable(this)
    }

    private _words: Word[] = [];
    get words(): Readonly<Word[]> { return this._words }

    private _error: Error | null = null
    get error() { return this._error }
    set error(value: Error | null) { this._error = value }

    addWord(v: Word) { this._words.push(v) }
    removeWord(v: Word) {
        const index = this._words.indexOf(v)
        this._words.splice(index, 1)
    }

    getWordById(wordId: string) {
        return this._words.find(word => word.id === wordId)
    }
}
export default Words
