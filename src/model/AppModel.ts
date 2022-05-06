import { createContext } from 'react'

import Words from './Words'

export const createAppModel = () => new AppModel()
export const AppModelContext = createContext({} as ReturnType<typeof createAppModel>)

class AppModel {
    words = new Words()
}
export default AppModel
