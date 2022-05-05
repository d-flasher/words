import { Unsubscribe } from '../utils/common-types'
import Emitter from '../utils/Emitter'
import { IAuthService, IUser } from './auth-service'

export class AuthServiceMock implements IAuthService {
    constructor(
        private _mode: 'regular' | 'error',
        private _responceDelay = 30,
    ) { }

    private _emitter = new Emitter<IUser | null>()
    private _testUser: IUser = {}

    signIn(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        this._emitter.emit(this._testUser)
                        resolve(null)
                        break
                    case 'error':
                        reject(new Error('Error test message'))
                }
            }, this._responceDelay)
        })
    }

    signOut(): Promise<void> {
        this._emitter.emit(null)
        return Promise.resolve()
    }

    onAuthStateChanged(handler: (user: IUser | null) => void): Unsubscribe {
        this._emitter.add(handler)
        setTimeout(() => this._emitter.emit(null), this._responceDelay)
        return () => this._emitter.remove(handler)
    }
}
