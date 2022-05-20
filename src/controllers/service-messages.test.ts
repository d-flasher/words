import ServiceMessages, { IServiceMessage } from './service-messages'

describe('ServiceMessages', () => {
    test('subscribe', () => {
        const serviceMessages = new ServiceMessages()
        const fn = jest.fn()

        serviceMessages.subscribe(fn)
        expect(fn).toHaveBeenCalledTimes(0)

        serviceMessages.add('Msg1', 'error')
        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith<[IServiceMessage]>({ msg: 'Msg1', type: 'error' })

        serviceMessages.add('Msg2', 'info')
        expect(fn).toHaveBeenCalledTimes(2)
        expect(fn).toHaveBeenCalledWith<[IServiceMessage]>({ msg: 'Msg2', type: 'info' })
    })

    test('start/stop subscribe', () => {
        const serviceMessages = new ServiceMessages()
        const fn = jest.fn()

        const unsubscribe =
            serviceMessages.subscribe(fn)
        expect(fn).toHaveBeenCalledTimes(0)

        serviceMessages.add('Msg', 'error')
        expect(fn).toHaveBeenCalledTimes(1)

        unsubscribe()
        serviceMessages.add('Msg', 'error')
        expect(fn).toHaveBeenCalledTimes(1)

        serviceMessages.subscribe(fn)
        expect(fn).toHaveBeenCalledTimes(1)

        serviceMessages.add('Msg', 'error')
        expect(fn).toHaveBeenCalledTimes(2)
    })
})
