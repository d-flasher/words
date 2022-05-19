import { createContext, FC, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import AppModel from '../model/app-model'
import AppRoutes from './AppRoutes'

const createModel = () => new AppModel()
export const ModelContext = createContext({} as ReturnType<typeof createModel>)

const WordsApp: FC = () => {
    const [model] = useState(() => createModel())

    return (
        <ModelContext.Provider value={appModel}>
            <BrowserRouter>
                <AppRoutes></AppRoutes>
            </BrowserRouter>
        </ModelContext.Provider>
    )
}
export default WordsApp
