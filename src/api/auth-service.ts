import { Unsubscribe } from '../utils/common-types'

export type IUser = {}

interface IAuthService {
    signIn(email: string, password: string): Promise<any>
    signOut(): Promise<void>
    onAuthStateChanged(handler: (user: IUser | null) => void): Unsubscribe
}
export default IAuthService
