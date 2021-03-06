import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import { FC } from 'react'
import { Navigate, Outlet, Route, Routes, useOutlet, useParams } from 'react-router-dom'

import LessonAdd from './lesson/LessonAdd'
import LessonEditor from './lesson/LessonEditor'
import LessonsList from './lesson/LessonsList'
import NavTabs from './NavTabs'
import StartedLesson from './started-lesson/StartedLesson'
import WordAdd from './word/WordAdd'
import WordEditor from './word/WordEditor'
import WordsList from './word/WordsList'

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

const LessonsOutlet: FC = () => {
    const outlet = useOutlet()

    return (
        <div data-testid="lessons-outlet">
            <LessonsList></LessonsList>
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

const WordEditorPage: FC = () => {
    const { id } = useParams()
    return <WordEditor id={id!}></WordEditor>
}

const LessonEditorPage: FC = () => {
    const { id } = useParams()
    return <LessonEditor id={id!}></LessonEditor>
}

const LessonStartPage: FC = () => {
    const { id } = useParams()
    return <StartedLesson id={id!}></StartedLesson>
}

export const AppRoutes: FC = () => (
    <Routes>
        <Route path="/" element={<BodyOutlet></BodyOutlet>}>
            <Route index element={<Navigate to="/words"></Navigate>}></Route>
            <Route path="words" element={<WordsOutlet></WordsOutlet>}>
                <Route path="add" element={<div data-testid="word-page-add"><WordAdd /></div>} />
                <Route path="edit/:id" element={<div data-testid="word-page-edit"><WordEditorPage /></div>} />
            </Route>
            <Route path="lessons" element={<LessonsOutlet></LessonsOutlet>}>
                <Route path="add" element={<div data-testid="lesson-page-add"><LessonAdd /></div>} />
                <Route path="edit/:id" element={<div data-testid="lesson-page-edit"><LessonEditorPage /></div>} />
                <Route path="start/:id" element={<div data-testid="lesson-page-start"><LessonStartPage /></div>} />
            </Route>
            <Route
                path="*"
                element={<div data-testid="404">404</div>}
            />
        </Route>
    </Routes>
)
export default AppRoutes
