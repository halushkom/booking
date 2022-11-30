import {Schema, model} from 'mongoose'
import {mongo} from "../services/database";
import { v4 as uuidv4 } from 'uuid';
const siteUrl = process.env.SITE_URL ;
const uploadsPath = `app/downloads/`;
const uploadsUrl = siteUrl + uploadsPath;

const patientSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    reg_token: {
        type: String
    },
    photo_avatar: {
        type: String,
        get: function (value): string {
            if (value) {
                return uploadsUrl + value
            }
        },
    },
    phone: {
        type: String
    },
    name: {
        type: String
    },
    type: {
        type: String,
        default: 'user'
    },
    appointments: {
        type: Array
    }
    }, {
    toObject: { getters: true },
    toJSON: { getters: true }

})
const Patient = mongo.model("Patient", patientSchema)

// @ts-ignore
Patient.createUser = async (requestBody) => {
    return Patient.create({
        _id: uuidv4(),
        reg_token: uuidv4(),
        ...requestBody,
        appointments: []
    })
}

export {Patient}
