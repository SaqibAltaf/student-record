import { errors } from '../helper';
import { StudentSchema } from '../schemas';

class studentDatabase {

    get() {
        return new Promise((resolve, reject) => {
            try {
                StudentSchema.find({}, (error, data) => {
                    if (error) {
                        errors["002"].reason = error.message || "";
                        reject(errors["002"]);
                    } else {
                        resolve(data);
                    }
                })
            } catch (error) {
                errors["003"].reason = error.message;
                reject(errors["003"]);
            }
        })
    }

    create(studentObject) {
        return new Promise((resolve, reject) => {
            try {
                StudentSchema.create(studentObject, (error, resposne) => {
                    if (error) {
                        errors["001"].reason = error.message;
                        reject(errors["001"]);
                    } else {
                        resolve(resposne);
                    }
                })
            } catch (error) {
                errors["003"].reason = error.message;
                reject(errors["003"]);
            }
        })
    }

    update(_id, obj) {
        return new Promise((resolve, reject) => {
            try {
                // _id = {_id : 5f11c07def842a36cc12a31e}
                // set  new: true it will be return updated document
                StudentSchema.findOneAndUpdate(_id, obj, { new: true }, (error, resposne) => {
                    if (error) {
                        errors["005"].reason = error.message;
                        reject(errors["005"]);
                    } else {
                        resolve(resposne);
                    }
                })
            } catch (error) {
                errors["003"].reason = error.message;
                reject(errors["003"]);
            }
        })
    }

}



export default new studentDatabase();