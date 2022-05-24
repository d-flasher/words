import { Unsubscribe } from '../utils/common-types'
import Emitter from '../utils/emitter'

export type ServiceMessageType = 'error' | 'info'
export interface IServiceMessage {
    msg: string
    type: ServiceMessageType
}

class ServiceMessages {

    private _emitter = new Emitter<IServiceMessage>()

    subscribe(handler: (message: IServiceMessage) => void): Unsubscribe {
        this._emitter.add(handler)
        return () => this._emitter.remove(handler)
    }

    add(message: string, type: ServiceMessageType) {
        if (type === 'error') console.warn(message)
        this._emitter.emit({ msg: message, type: type })
    }
}
export default ServiceMessages
