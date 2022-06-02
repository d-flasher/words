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

    static isStringsEqual(str1: string | undefined | null, str2: string | undefined | null): boolean {
        if (str1 == null || str2 == null) return false
        return str1.trim().toLowerCase() === str2.trim().toLowerCase()
    }

    static getRandomNum(from: number, to: number) {
        const l = to - from
        return from + Math.round(Math.random() * l)
    }
}
export default Utils
