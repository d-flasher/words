import Lesson from '../../model/lesson'
import Word from '../../model/word'
import TestUtils from '../../utils/test-utils'
import StartedLesson from './StartedLesson'

const StartedLessonWordsProps_MockFn = jest.fn()
const StartedLessonWords_Mock = (props: any) => {
    StartedLessonWordsProps_MockFn(props)
    return 'mocked child'
}
jest.mock('./StartedLessonWords', () => StartedLessonWords_Mock)

describe('StartedLesson', () => {
    test('regular word', () => {
        const { model } = TestUtils.render(<StartedLesson id="id1" />);

        ['1', '2'].forEach(i => {
            const word = new Word('id' + i)
            word.setValue(i)
            word.setTranslate(i)
            model.words.add(word)
        })

        const lesson = new Lesson('id1')
        lesson.setWordsIds(model.words.list.map(i => i.id))
        model.lessons.add(lesson)

        expect(StartedLessonWordsProps_MockFn).toBeCalledTimes(1)
        expect(StartedLessonWordsProps_MockFn).toBeCalledWith({ words: model.words.list })
    })

    test('lesson not exist', () => {
        const { getByRole } = TestUtils.render(<StartedLesson id="id1" />)
        expect(getByRole('alert')).toHaveTextContent('Lesson id: "id1" is empty')
    })

    test('lesson is empty', () => {
        const { getByRole, model } = TestUtils.render(<StartedLesson id="id1" />)
        const lesson = new Lesson('id1')
        model.lessons.add(lesson)
        expect(getByRole('alert')).toHaveTextContent('Lesson id: "id1" is empty')
    })
})
