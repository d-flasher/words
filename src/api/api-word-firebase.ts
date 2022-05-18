import { getAuth } from 'firebase/auth'
import {
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    FirestoreDataConverter,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore'

import { IWord, IWordPayload } from '../model/word'
import { Unsubscribe } from '../utils/common-types'
import { ChangeData, IApiEntity, OnChangesFn } from './api-entity'

interface IWordFirebase extends IWord {
    userId: string
}

class ApiWordFirebase implements IApiEntity<IWord, IWordPayload> {

    private _uid: string
    private _collectionWords: CollectionReference<IWord>

    constructor() {
        const db = getFirestore()
        const auth = getAuth()

        this._uid = auth.currentUser!.uid

        const converter_word: FirestoreDataConverter<IWord> = {
            toFirestore: word => <IWordFirebase>{ userId: this._uid, ...word },
            fromFirestore: snapshot => <IWord>{ id: snapshot.id, ...snapshot.data() },
        }
        this._collectionWords = collection(db, 'words').withConverter(converter_word)
    }

    changesTracking(onChanges: OnChangesFn<IWord>): Unsubscribe {
        const unsubscribe = onSnapshot(
            query(this._collectionWords, where('userId', '==', this._uid)),
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
        const docRef = doc(this._collectionWords, id)
        const resp = await getDoc(docRef)
        return resp.exists() ? resp.data() : null
    }
    async getList(): Promise<IWord[]> {
        const q = query(this._collectionWords, where('userId', '==', this._uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(i => i.data())
    }

    async create(payload: IWordPayload): Promise<IWord> {
        const docRef = doc(this._collectionWords)
        await setDoc(docRef, payload)
        const docSnap = await getDoc(docRef)
        return docSnap.data()!
    }
    async edit(id: string, payload: IWordPayload): Promise<void> {
        const docRef = doc(this._collectionWords, id)
        await updateDoc(docRef, payload)
    }
    async remove(id: string): Promise<void> {
        await deleteDoc(doc(this._collectionWords, id))
    }
}
export default ApiWordFirebase
