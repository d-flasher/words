import { createContext, FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import IAppApi from '../api/app-api'
import AppApiFirebase from '../api/app-api-firebase'
import AppController from '../controllers/app-controller'
import AppModel from '../model/app-model'
import AppRoutes from './AppRoutes'

const createModel = () => new AppModel()
export const ModelContext = createContext({} as ReturnType<typeof createModel>)

const createApi: () => IAppApi = () => new AppApiFirebase()
export const ApiContext = createContext({} as ReturnType<typeof createApi>)

const createController = (model: AppModel, api: IAppApi) => new AppController(model, api)
export const ControllerContext = createContext({} as ReturnType<typeof createController>)

const WordsApp: FC = () => {
    const [model] = useState(() => createModel())
    const [api] = useState(() => createApi())
    const [controller] = useState(() => createController(model, api))

    useEffect(() => {
        controller.words.start()
        return () => {
            controller.words.stop()
        }
    }, [])

    return (
        <ModelContext.Provider value={model}>
            <ApiContext.Provider value={api}>
                <ControllerContext.Provider value={controller}>
                    <BrowserRouter>
                        <AppRoutes></AppRoutes>
                    </BrowserRouter>
                </ControllerContext.Provider>
            </ApiContext.Provider>
        </ModelContext.Provider>
    )
}
export default WordsApp
