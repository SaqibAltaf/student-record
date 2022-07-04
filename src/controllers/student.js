import { Helper } from '../helper';
import { studentService } from '../services';

class studentsController {

    get(request, response) {
        studentService.get()
            .then((data) => {
                Helper.responseJsonHandler(null, data, response)
            }).catch((error) => {
                Helper.responseJsonHandler(error, null, response)
            })
    }

    post(request, response) {
        studentService.create(request.body)
            .then((data) => {
                Helper.responseJsonHandler(null, data, response)
            }).catch((error) => {
                Helper.responseJsonHandler(error, null, response)
            })
    }

    update(request, response) {
        studentService.update(request.params, request.body)
            .then((data) => {
                Helper.responseJsonHandler(null, data, response)
            }).catch((error) => {
                Helper.responseJsonHandler(error, null, response)
            })
    }

    search(request, response) {
        studentService.search(request.params)
            .then((data) => {
                Helper.responseJsonHandler(null, data, response)
            }).catch((error) => {
                Helper.responseJsonHandler(error, null, response)
            })
    }
    getResults(request, response) {
        studentService.getResults()
            .then((data) => {
                Helper.responseJsonHandler(null, data, response)
            }).catch((error) => {
                Helper.responseJsonHandler(error, null, response)
            })
    }

}

export default new studentsController();