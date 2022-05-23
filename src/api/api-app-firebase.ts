import IApiApp from './api-app'
import ApiLessonFirebase from './api-lesson-firebase'
import ApiWordFirebase from './api-word-firebase'

class ApiAppFirebase implements IApiApp {
    words = new ApiWordFirebase()
    lessons = new ApiLessonFirebase()
}
export default ApiAppFirebase
