import { FC } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

const BodyOutlet: FC = () => {
    return (
        <div data-testid="body-outlet">
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
