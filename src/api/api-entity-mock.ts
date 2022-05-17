import { IWord, IWordPayload } from '../model/Word'
import { Unsubscribe } from '../utils/common-types'
import Emitter, { EmitterCallback } from '../utils/Emitter'
import Utils from '../utils/Utils'
import { IApiEntity, OnChangesFn } from './api-entity'
import MockError from './mock-error'

type ChangesCallbackParameter<T> = Parameters<OnChangesFn<T>>[0]

export abstract class ApiEntityMock<T extends { id: string }, K> implements IApiEntity<T, K> {

    constructor(
        private _mode: 'regular' | 'error',
        private _responceDelay = 30,
    ) { }

    protected abstract _createFromPayload(payload: K): T
    protected abstract _editFromPayload(target: T, payload: K): void

    private _entities: T[] = []
    private _emitter = new Emitter<ChangesCallbackParameter<T>>()
    private _eCallback: EmitterCallback<ChangesCallbackParameter<T>> | null = null

    changesTracking(onChanges: OnChangesFn<T>): Unsubscribe {
        this._eCallback = changesData => onChanges(changesData)
        this._emitter.add(this._eCallback)
        this._emitter.emit(this._entities.map(item => ({ type: 'added', data: item })))
        return () => {
            if (this._eCallback) this._emitter.remove(this._eCallback)
        }
    }

    get(id: string): Promise<T | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        const entity = this._entities.find(item => item.id === id)
                        resolve(entity ? entity : null)
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    getList(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        resolve(this._entities)
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    create(payload: K): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        const entity = this._createFromPayload(payload)
                        this._entities.push(entity)
                        this._emitter.emit([{ type: 'added', data: entity }])
                        resolve(entity)
                        break

                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    edit(id: string, payload: K): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        const entity = this._entities.find(item => item.id === id)!
                        this._editFromPayload(entity, payload)
                        this._emitter.emit([{ type: 'edited', data: entity }])
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
                        const foundIndex = this._entities.findIndex(item => item.id === id)!
                        const entity = this._entities[foundIndex]
                        this._entities.splice(foundIndex, 1)
                        this._emitter.emit([{ type: 'removed', data: entity }])
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

export class ApiWordMock extends ApiEntityMock<IWord, IWordPayload> {
    protected _createFromPayload(payload: IWordPayload): IWord {
        return { id: Utils.uuid(), value: payload.value, translate: payload.translate }
    }

    protected _editFromPayload(target: IWord, payload: IWordPayload): void {
        target.value = payload.value
        target.translate = payload.translate
    }
}
