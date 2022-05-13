import { FC } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import NavTabs from './NavTabs'

const BodyOutlet: FC = () => {
    return (
        <div data-testid="body-outlet">
            <NavTabs></NavTabs>
            <Outlet></Outlet>
        </div>
    )
}

const WordsOutlet: FC = () => {
    return (
        <div data-testid="words-outlet">
            <Outlet></Outlet>
        </div>
    )
}

export const AppRoutes: FC = () => (
    <Routes>
        <Route path="/" element={<BodyOutlet></BodyOutlet>}>
            <Route index element={<Navigate to="/words"></Navigate>}></Route>
            <Route path="words" element={<WordsOutlet></WordsOutlet>}>
                <Route path="add" element={<div data-testid="word-page-add"></div>} />
                <Route path="edit/:id" element={<div data-testid="word-page-edit"></div>} />
            </Route>
            <Route
                path="*"
                element={<div data-testid="404">404</div>}
            />
        </Route>
    </Routes>
)
export default AppRoutes
