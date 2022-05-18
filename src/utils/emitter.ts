export type EmitterCallback<T = void> = (arg: T) => void
class Emitter<T = void> {
    private _callbacks = new Set<EmitterCallback<T>>()

    add(callback: EmitterCallback<T>) { this._callbacks.add(callback) }
    remove(callback: EmitterCallback<T>) { this._callbacks.delete(callback) }
    emit(arg: T) {
        this._callbacks.forEach(callback => callback(arg))
    }
}
export default Emitter
