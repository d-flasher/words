import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import { FC } from 'react'
import { Navigate, Outlet, Route, Routes, useOutlet, useParams } from 'react-router-dom'

import NavTabs from './NavTabs'
import WordAdd from './WordAdd'
import WordEditor from './WordEditor'
import WordsList from './WordsList'

const BodyOutlet: FC = () => {
    return (
        <div data-testid="body-outlet">
            <NavTabs></NavTabs>
            <Outlet></Outlet>
        </div>
    )
}

const WordsOutlet: FC = () => {
    const outlet = useOutlet()

    return (
        <div data-testid="words-outlet">
            <WordsList></WordsList>
            <Drawer
                anchor="bottom"
                open={outlet != null}
                variant="persistent"
            >
                <Container maxWidth="sm">
                    <Box mt={2} mb={1}>
                        <Outlet></Outlet>
                    </Box>
                </Container>
            </Drawer>
        </div>
    )
}

const WordEditPage: FC = () => {
    const { id } = useParams()
    return <WordEditor id={id!}></WordEditor>
}

export const AppRoutes: FC = () => (
    <Routes>
        <Route path="/" element={<BodyOutlet></BodyOutlet>}>
            <Route index element={<Navigate to="/words"></Navigate>}></Route>
            <Route path="words" element={<WordsOutlet></WordsOutlet>}>
                <Route path="add" element={<div data-testid="word-page-add"><WordAdd /></div>} />
                <Route path="edit/:id" element={<div data-testid="word-page-edit"><WordEditPage /></div>} />
            </Route>
            <Route
                path="*"
                element={<div data-testid="404">404</div>}
            />
        </Route>
    </Routes>
)
export default AppRoutes
