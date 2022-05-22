import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'

import IApiAuth from './api-auth'

class ApiAuthFirebase implements IApiAuth {
    signIn(email: string, password: string) {
        return signInWithEmailAndPassword(getAuth(), email, password)
    }

    signOut() {
        return signOut(getAuth())
    }

    onAuthStateChanged(handler: (user: User | null) => void) {
        return onAuthStateChanged(getAuth(), handler)
    }
}
export default ApiAuthFirebase
