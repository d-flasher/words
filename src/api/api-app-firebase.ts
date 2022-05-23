import IApiApp from './api-app'
import ApiWordFirebase from './api-word-firebase'

class ApiAppFirebase implements IApiApp {
    words = new ApiWordFirebase()
}
export default ApiAppFirebase
