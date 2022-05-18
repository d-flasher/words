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
})
