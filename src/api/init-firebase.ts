import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

export class InitFirebase {
    constructor() {
        initializeApp({
            apiKey: "AIzaSyDNJbAifhsCUYwsy_srODazpr_4bxcvR6c",
            authDomain: "test-project-b6310.firebaseapp.com",
            databaseURL: "https://test-project-b6310-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "test-project-b6310",
            storageBucket: "test-project-b6310.appspot.com",
            messagingSenderId: "109030096181",
            appId: "1:109030096181:web:c0ac0c1053c471b904607c"
        })

        const db = getFirestore()
        const auth = getAuth()

        if (process.env.NODE_ENV !== 'production') {
            connectFirestoreEmulator(db, 'localhost', 8080)
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
        }
    }
}
