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

    test('isStringsEqual', () => {
        expect(Utils.isStringsEqual('qwerty', null)).not.toBeTruthy()
        expect(Utils.isStringsEqual('qwerty', undefined)).not.toBeTruthy()
        expect(Utils.isStringsEqual(null, null)).not.toBeTruthy()
        expect(Utils.isStringsEqual(null, undefined)).not.toBeTruthy()

        expect(Utils.isStringsEqual('qwerty', 'qwerty')).toBeTruthy()
        expect(Utils.isStringsEqual('qwerty', 'qwerty ')).toBeTruthy()
        expect(Utils.isStringsEqual('qwerty', 'qWerty ')).toBeTruthy()
    })

    test('getRandomNum', () => {
        expect(Utils.getRandomNum(0, 0)).toBe(0)
        expect(Utils.getRandomNum(1, 1)).toBe(1)

        let result = Utils.getRandomNum(0, 1)
        expect(result == 0 || result == 1).toBeTruthy()

        let first, second, third = false
        for (let i = 0; i < 100; i++) {
            result = Utils.getRandomNum(0, 2)
            if (result === 0) first = true
            if (result === 1) second = true
            if (result === 2) third = true
            if (first && second && third) break
        }
        expect(first && second && third).toBeTruthy()
    })
})
