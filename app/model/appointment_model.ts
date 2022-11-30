import {Schema, model} from 'mongoose';
import {Doctor} from "./dockor_model";
import {Patient} from "./patient_model";
import {mongo} from "../services/database";
import moment from "moment";


const appointmentSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    user: {
        type: String
    },
    doctor: {
        type: String
    },
    active: {
        type: Boolean
    }
})
const Appointment = mongo.model("Appointment", appointmentSchema)

// @ts-ignore
Appointment.validateAppointment = async (appointmentData) => {
    const patient = await Patient.findById(appointmentData.user);
    if (!patient) {
        return { message: 'Patient not found' }
    }
    const doctor = await Doctor.findById(appointmentData.doctor);
    if (!doctor) {
        return { message: 'Doctor not found'}
    }
    const isDocAppointments = await Doctor.find({
        _id: appointmentData.doctor
    })
    // @ts-ignore
    const filteredAppointment = isDocAppointments.filter(item => item.appointments_accepted.date == appointmentData.date)
    console.log(filteredAppointment)
    if (filteredAppointment.length >= 3) {
        return { message: 'Doctor is busy in selected day'}
    }
    if (!filteredAppointment) {
        return
    }
    if (moment(appointmentData.date) < moment()) {
        return { message: "Pls choose another date" };
    }
    return {...appointmentData}
}

// @ts-ignore
Appointment.getAppointmentList = async () => {
    return Appointment.find({})//.exec()
}

export {Appointment}
