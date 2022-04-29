import { Unsubscribe } from '../utils/common-types'
import { IAuthService, IUser } from './auth-service'

export class AuthServiceMock implements IAuthService {
    constructor(
        private _mode: 'regular' | 'error'
    ) { }

    signIn(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (this._mode) {
                    case 'regular':
                        resolve(null)
                        break
                    case 'error':
                        reject(new Error('Error test message'))
                }
            }, 30)
        })
    }

    signOut(): Promise<void> {
        return Promise.resolve()
    }

    onAuthStateChanged(handler: (user: IUser | null) => void): Unsubscribe {
        return () => { }
    }
}
