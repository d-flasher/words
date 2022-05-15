import { IWord, IWordPayload } from '../model/Word'
import { Unsubscribe } from '../utils/common-types'
import Emitter, { EmitterCallback } from '../utils/Emitter'
import Utils from '../utils/Utils'
import { IApiEntity, OnChangesFn } from './api-entity'
import MockError from './mock-error'

type ChangesCallbackParameter = Parameters<OnChangesFn<IWord>>[0]

export class ApiWordMock implements IApiEntity<IWord, IWordPayload> {

    constructor(
        private _mode: 'regular' | 'error',
        private _responceDelay = 30,
    ) { }

    private _words: IWord[] = []
    private _emitter = new Emitter<ChangesCallbackParameter>()
    private _eCallback: EmitterCallback<ChangesCallbackParameter> | null = null

    changesTracking(onChanges: OnChangesFn<IWord>): Unsubscribe {
        this._eCallback = changesData => onChanges(changesData)
        this._emitter.add(this._eCallback)
        if (this._words.length > 0) this._emitter.emit(this._words.map(item => ({ type: 'added', data: item })))
        return () => {
            if (this._eCallback) this._emitter.remove(this._eCallback)
        }
    }

    get(id: string): Promise<IWord | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        const word = this._words.find(item => item.id === id)
                        resolve(word ? word : null)
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    getList(): Promise<IWord[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        resolve(this._words)
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    create(payload: IWordPayload): Promise<IWord> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        const word = <IWord>{ id: Utils.uuid(), value: payload.value, translate: payload.translate }
                        this._words.push(word)
                        this._emitter.emit([{ type: 'added', data: word }])
                        resolve(word)
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    edit(id: string, payload: IWordPayload): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        const word = this._words.find(word => word.id === id)!
                        word.value = payload.value
                        word.translate = payload.translate
                        this._emitter.emit([{ type: 'edited', data: word }])
                        resolve()
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    remove(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        const foundIndex = this._words.findIndex(item => item.id === id)!
                        const word = this._words[foundIndex]
                        this._words.splice(foundIndex, 1)
                        this._emitter.emit([{ type: 'removed', data: word }])
                        resolve()
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }
}
