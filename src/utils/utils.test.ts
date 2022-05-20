import Utils from './utils'

describe('Utils', () => {
    test('uuid', () => {
        let repeats = 10
        let prevUuid: string | undefined
        while (repeats > 0) {
            repeats--
            const currentUuid = Utils.uuid()
            expect(currentUuid).toHaveLength(36)
            expect(currentUuid != prevUuid).toBeTruthy()
            prevUuid = currentUuid
        }
    })

    test('asError', () => {
        const msg1 = 'Test message1'
        const error1: unknown = new Error(msg1)
        expect(Utils.asError(error1).message).toBe(msg1)

        const msg2 = 'Test message2'
        const error2: unknown = msg2
        expect(Utils.asError(error2).message).toBe(msg2)
    })
})
