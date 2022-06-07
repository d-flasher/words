import { getAuth } from 'firebase/auth'
import {
    collection,
    CollectionReference,
    deleteDoc,
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
} from 'firebase/firestore'

import { ILesson, ILessonPayload } from '../model/lesson'
import { Unsubscribe } from '../utils/common-types'
import IApiEntity, { ChangeData, OnChangesFn } from './api-entity'

interface ILessonFirebase extends ILesson {
    userId: string
    timestamp: FieldValue
}

class ApiLessonFirebase implements IApiEntity<ILesson, ILessonPayload> {

    private _uid: string
    private _collection: CollectionReference<ILesson>

    constructor() {
        const db = getFirestore()
        const auth = getAuth()

        this._uid = auth.currentUser!.uid

        const converter: FirestoreDataConverter<ILesson> = {
            toFirestore: data => ({ userId: this._uid, timestamp: serverTimestamp(), ...data } as ILessonFirebase),
            fromFirestore: snapshot => ({ id: snapshot.id, ...snapshot.data() } as ILesson),
        }
        this._collection = collection(db, 'lesson').withConverter(converter)
    }

    changesTracking(onChanges: OnChangesFn<ILesson>): Unsubscribe {
        const unsubscribe = onSnapshot(
            query(this._collection, where('userId', '==', this._uid), orderBy('timestamp', 'asc')),
            snapshot => {
                const changes = snapshot.docChanges().map<ChangeData<ILesson>>(change => {
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

    async get(id: string): Promise<ILesson | null> {
        const docRef = doc(this._collection, id)
        const resp = await getDoc(docRef)
        return resp.exists() ? resp.data() : null
    }
    async getList(): Promise<ILesson[]> {
        const q = query(this._collection, where('userId', '==', this._uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(i => i.data())
    }

    async create(payload: ILessonPayload): Promise<ILesson> {
        const docRef = doc(this._collection)
        await setDoc(docRef, payload)
        const docSnap = await getDoc(docRef)
        return docSnap.data()!
    }
    async edit(id: string, payload: ILessonPayload): Promise<void> {
        const docRef = doc(this._collection, id)
        await updateDoc(docRef, payload)
    }
    async remove(id: string): Promise<void> {
        await deleteDoc(doc(this._collection, id))
    }
}
export default ApiLessonFirebase
