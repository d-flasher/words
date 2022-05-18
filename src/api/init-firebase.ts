import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

class InitFirebase {
    constructor() {
        initializeApp({
            apiKey: "AIzaSyDgccCxTZqAZtyrJt2Wc9n60MewqR_rtqA",
            authDomain: "words-6050c.firebaseapp.com",
            projectId: "words-6050c",
            storageBucket: "words-6050c.appspot.com",
            messagingSenderId: "899389753457",
            appId: "1:899389753457:web:13b03b8ae1fc0d4d8973d0"
        })

        const db = getFirestore()
        const auth = getAuth()

        if (process.env.NODE_ENV !== 'production') {
            connectFirestoreEmulator(db, 'localhost', 8080)
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
        }
    }
}
export default InitFirebase
