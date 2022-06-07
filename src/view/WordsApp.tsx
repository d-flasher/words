import { SnackbarProvider } from 'notistack'
import { createContext, FC, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import IApiApp from '../api/api-app'
import ApiAppFirebase from '../api/api-app-firebase'
import ControllerApp from '../controllers/controller-app'
import AppModel from '../model/app-model'
import AppRoutes from './AppRoutes'
import Snackbars from './Snackbars'

const createModel = () => new AppModel()
export const ModelContext = createContext({} as ReturnType<typeof createModel>)

const createApi: () => IApiApp = () => new ApiAppFirebase()
export const ApiContext = createContext({} as ReturnType<typeof createApi>)

const createController = (model: AppModel, api: IApiApp) => new ControllerApp(model, api)
export const ControllerContext = createContext({} as ReturnType<typeof createController>)

const WordsApp: FC = () => {
    const [model] = useState(() => createModel())
    const [api] = useState(() => createApi())
    const [controller] = useState(() => createController(model, api))

    useEffect(() => {
        controller.words.start()
        controller.lessons.start()
        return () => {
            controller.words.stop()
            controller.lessons.stop()
        }
    }, [controller.words, controller.lessons])

    return (
        <ModelContext.Provider value={model}>
            <ApiContext.Provider value={api}>
                <ControllerContext.Provider value={controller}>
                    <BrowserRouter>
                        <AppRoutes></AppRoutes>
                    </BrowserRouter>
                    <SnackbarProvider maxSnack={3}>
                        <Snackbars></Snackbars>
                    </SnackbarProvider>
                </ControllerContext.Provider>
            </ApiContext.Provider>
        </ModelContext.Provider>
    )
}
export default WordsApp
