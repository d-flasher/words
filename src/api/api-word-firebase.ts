import { getAuth } from 'firebase/auth'
import {
    collection,
    CollectionReference,
    doc,
    FieldValue,
    FirestoreDataConverter,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
    writeBatch,
} from 'firebase/firestore'

import { ILessonPayload } from '../model/lesson'
import { IWord, IWordPayload } from '../model/word'
import { Unsubscribe } from '../utils/common-types'
import IApiEntity, { ChangeData, OnChangesFn } from './api-entity'

interface IWordFirebase extends IWord {
    userId: string
    timestamp: FieldValue
}

class ApiWordFirebase implements IApiEntity<IWord, IWordPayload> {

    private _uid: string
    private _collection: CollectionReference<IWord>

    constructor() {
        const db = getFirestore()
        const auth = getAuth()

        this._uid = auth.currentUser!.uid

        const converter: FirestoreDataConverter<IWord> = {
            toFirestore: data => ({ userId: this._uid, timestamp: serverTimestamp(), ...data } as IWordFirebase),
            fromFirestore: snapshot => ({ id: snapshot.id, ...snapshot.data() } as IWord),
        }
        this._collection = collection(db, 'words').withConverter(converter)
    }

    changesTracking(onChanges: OnChangesFn<IWord>): Unsubscribe {
        const unsubscribe = onSnapshot(
            query(this._collection, where('userId', '==', this._uid), orderBy('timestamp', 'asc')),
            snapshot => {
                const changes = snapshot.docChanges().map<ChangeData<IWord>>(change => {
                    switch (change.type) {
                        case 'added':
                            return { data: change.doc.data(), type: 'added' }
                        case 'modified':
                            return { data: change.doc.data(), type: 'edited' }
                        case 'removed':
                            return { data: change.doc.data(), type: 'removed' }
                        default:
                            throw new Error(`Not implemented for type "${change.type}"`)
                    }
                })
                onChanges(changes)
            },
            error => console.log('onSnapshot Error', error),
        )

        return unsubscribe
    }

    async get(id: string): Promise<IWord | null> {
        const docRef = doc(this._collection, id)
        const resp = await getDoc(docRef)
        return resp.exists() ? resp.data() : null
    }
    async getList(): Promise<IWord[]> {
        const q = query(this._collection, where('userId', '==', this._uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(i => i.data())
    }

    async create(payload: IWordPayload): Promise<IWord> {
        const docRef = doc(this._collection)
        await setDoc(docRef, payload)
        const docSnap = await getDoc(docRef)
        return docSnap.data()!
    }
    async edit(id: string, payload: IWordPayload): Promise<void> {
        const docRef = doc(this._collection, id)
        await updateDoc(docRef, payload)
    }
    async remove(id: string): Promise<void> {
        const db = getFirestore()
        const batch = writeBatch(db)

        // get related lessons
        const lessonsCol = collection(db, 'lesson')
        const querySnapshot = await getDocs(
            query(lessonsCol, where('userId', '==', this._uid), where('wordsIds', 'array-contains', id))
        )

        // delete link to word in lessons
        querySnapshot.docs.forEach(docSnapshot => {
            const lessonData = docSnapshot.data() as ILessonPayload
            if (lessonData.wordsIds) {
                const lessonNewWords = lessonData.wordsIds.filter(i => i !== id)
                batch.set(docSnapshot.ref, { wordsIds: lessonNewWords } as ILessonPayload, { merge: true })
            }
        })

        // delete word
        batch.delete(doc(this._collection, id))

        await batch.commit()
    }
}
export default ApiWordFirebase
