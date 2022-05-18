import { Unsubscribe } from '../utils/common-types'

export type ChangeData<T> = { type: 'added' | 'edited' | 'removed', data: T }
export type OnChangesFn<T> = (changes: ChangeData<T>[] | Error) => void

interface IApiEntity<T, TPayload> {
    changesTracking(onChanges: OnChangesFn<T>): Unsubscribe

    get(id: string): Promise<T | null>
    getList(): Promise<T[]>

    create(payload: TPayload): Promise<T>
    edit(id: string, payload: TPayload): Promise<void>
    remove(id: string): Promise<void>
}
export default IApiEntity
