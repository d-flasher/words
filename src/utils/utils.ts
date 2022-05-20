class Utils {
    static uuid(): string {
        let u = ''
        let i = 0
        while (i++ < 36) {
            const c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1]
            const r = Math.random() * 16 | 0
            const v = (c == 'x') ? r : (r & 0x3 | 0x8)
            u += (c == '-' || c == '4') ? c : v.toString(16)
        }
        return u
    }

    static asError(error: unknown) {
        return error instanceof Error ? error : { message: String(error) }
    }

}
export default Utils
