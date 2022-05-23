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
            toFirestore: data => <IWordFirebase>{ userId: this._uid, timestamp: serverTimestamp(), ...data },
            fromFirestore: snapshot => <IWord>{ id: snapshot.id, ...snapshot.data() },
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
        await deleteDoc(doc(this._collection, id))
    }
}
export default ApiWordFirebase
