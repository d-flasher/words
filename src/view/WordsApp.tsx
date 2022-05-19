import { createContext, FC, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import AppModel from '../model/app-model'
import AppRoutes from './AppRoutes'

const createAppModel = () => new AppModel()
export const AppModelContext = createContext({} as ReturnType<typeof createAppModel>)

const WordsApp: FC = () => {
    const [appModel] = useState(() => createAppModel())

    return (
        <AppModelContext.Provider value={appModel}>
            <BrowserRouter>
                <AppRoutes></AppRoutes>
            </BrowserRouter>
        </AppModelContext.Provider>
    )
}
export default WordsApp
