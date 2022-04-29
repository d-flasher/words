import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'

import { IAuthService } from './auth-service'

export class AuthServiceFirebase implements IAuthService {
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
