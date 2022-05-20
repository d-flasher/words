import IEntity from './entity'

interface IEntities<T extends IEntity> {
    get list(): Readonly<T[]>
    error: Error | undefined
    isLoading: boolean
    add(v: T): void
    remove(id: string): void
    getById(wordId: string): T | undefined
    clear(): void
}
export default IEntities
