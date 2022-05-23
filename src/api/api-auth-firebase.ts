import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'

import IApiAuth from './api-auth'

class ApiAuthFirebase implements IApiAuth {

    private _auth: Auth

    constructor() {
        this._auth = getAuth()
    }

    signIn(email: string, password: string) {
        return signInWithEmailAndPassword(this._auth, email, password)
    }

    signOut() {
        return signOut(this._auth)
    }

    onAuthStateChanged(handler: (user: User | null) => void) {
        return onAuthStateChanged(this._auth, handler)
    }
}
export default ApiAuthFirebase
