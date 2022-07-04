import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const AddressSchema = new Schema({
    label: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zip_code: {
        type: String
    }
});



const StudentSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address:[AddressSchema],
    referred_by: {
        type: Schema.Types.ObjectId
    }
},{
    timestamps: true
  });

export default mongoose.model('students', StudentSchema);