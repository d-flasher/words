import { Unsubscribe } from '../utils/common-types'
import Emitter from '../utils/Emitter'
import { IAuthService, IUser } from './auth-service'
import MockError from './mock-error'

export class AuthServiceMock implements IAuthService {
    constructor(
        private _mode: 'regular' | 'error',
        private _responceDelay = 30,
    ) { }

    private _emitter = new Emitter<IUser | null>()
    private _testUser: IUser = {}

    signIn(email: string, password: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        this._emitter.emit(this._testUser)
                        resolve({})
                        break
                    case 'error':
                        reject(new MockError())
                }
            }, this._responceDelay)
        })
    }

    signOut(): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        this._emitter.emit(null)
                        resolve()
                        break
                    case 'error':
                        reject(new MockError())
                        break
                }
            }, this._responceDelay)
        })
    }

    onAuthStateChanged(handler: (user: IUser | null) => void): Unsubscribe {
        this._emitter.add(handler)
        setTimeout(() => this._emitter.emit(null), this._responceDelay)
        return () => this._emitter.remove(handler)
    }
}
