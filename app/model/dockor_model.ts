import {Schema, model} from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
import {mongo} from "../services/database";

const siteUrl = process.env.SITE_URL ;
const uploadsPath = 'app/downloads/';
const uploadsUrl = siteUrl + uploadsPath;

const doctorSchema = new Schema({
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
        type: String
    },
    spec: {
        type: String
    },
    free: {
        type: Boolean
    },
    appointments_accepted: {
        type: Array
    }
}, {
    toObject: { getters: true },
    toJSON: { getters: true }
})
const Doctor = mongo.model("Doctor", doctorSchema)
// @ts-ignore
Doctor.createUser = async (requestBody) => {
    return Doctor.create({
        _id: uuidv4(),
        reg_token: uuidv4(),
        appointments_accepted: [],
        ...requestBody,


    })
}

export {Doctor}
