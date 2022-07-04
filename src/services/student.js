import { studentDatabase } from '../database';
import { errors } from '../helper';
import { StudentSchema } from '../schemas';

export default class studentService {

    static get() {
        return new Promise((resolve, reject) => {
            studentDatabase.get()
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })

        })
    }

    static create(body) {
        return new Promise((resolve, reject) => {
            //  document id and obj is required
            studentDatabase.create(body)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    }

    static update(param, obj) {
        return new Promise((resolve, reject) => {
            const _id = param._id;
            //  document id and obj is required
            if (_id && obj) {
                studentDatabase.update(_id, obj)
                    .then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
            } else {
                // requried field not found
                reject(errors['004']);
            }
        })
    }


    static search(param) {
        return new Promise((resolve, reject) => {
            const params = param.key;
            //  document id and obj is required
            if (params) {
                console.log(params)
                StudentSchema.find({
                    $or: [
                        { first_name: { '$regex': new RegExp('.*' + params + '*.', 'i') } },
                        { last_name: { '$regex': new RegExp('.*' + params + '*.', 'i') } },
                        {
                            "address": {
                                $elemMatch: {
                                    city: { '$regex': new RegExp('.*' + params + '*.', 'i') },
                                }
                            }
                        },
                        {
                            "address": {
                                $elemMatch: {
                                    state: { '$regex': new RegExp('.*' + params + '*.', 'i') },
                                }
                            }
                        },
                    ]
                }).then(response => {
                    resolve(response)
                });
            } else {
                // requried field not found
                reject(errors['004']);
            }
        })
    }


    static getResults() {
        return new Promise((resolve, reject) => {
            //  document id and obj is required
            StudentSchema.aggregate()
                .group({
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    list: { $push: "$$ROOT" },
                })
                .unwind({ path: "$list", preserveNullAndEmptyArrays: true })
                .group({
                    _id: '$list.address.country', 'sum': { $sum: 1 },
                    date:{ "$first": "$_id" }
                })
                .project({
                    _id:0,
                    countries:{ $first: "$_id" },
                    date:1,
                    sum:1
                })
            
            
            .then(data => {
                resolve(data)
            }).catch(err=>{
                reject(errors['004']);
            })
        })
    }

}
