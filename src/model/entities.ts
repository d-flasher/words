import IEntity from './entity'

interface IEntities<T extends IEntity> {
    get list(): Readonly<T[]>
    error: Error | undefined
    add(v: T): void
    remove(v: T): void
    getById(wordId: string): T | undefined
    clear(): void
}
export default IEntities
