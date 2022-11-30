import {Doctor} from "../model/dockor_model";
import {Patient} from "../model/patient_model";
import {Appointment} from "../model/appointment_model";
import moment from 'moment';
import * as fs from 'fs';

export function notificationService(): void {
    const getFutureAppointments = async (userId: string) => {
        const appointments = await Appointment.find({ userId, date: { $gt: new Date() } });
        return appointments;
    }

    setInterval(async () => {
        const nowDate = new Date();
        const patients = await Patient.find();

        for (const patient of patients) {
            const appointments = await getFutureAppointments(patient.id);
            for (const appointment of appointments) {
                const doctorInfo = await Doctor.findOne({ id: appointment.doctor });
                if (moment(appointment.date).diff(moment(nowDate), 'days') === 1 ) {
                    const message = `${nowDate.toISOString()} | Hello, ${patient.name}! Remember, you have an appointment to ${doctorInfo.spec} tomorrow in ${appointment.date.toISOString()}!`;
                    fs.writeFile('/downloads/notification.log', message, (err) => {
                        if (err) {
                            return console.log(err)
                        }
                        console.log('The file was saved')
                    })
                    continue;
                }
                if (moment(appointment.date).diff(moment(nowDate), 'hours') === 2 ) {
                    const message = `${nowDate.toISOString()} | Hello, ${patient.name}! Remember, you have an appointment to ${doctorInfo.spec} in 2 hours: ${appointment.date.toISOString()}!`;
                    fs.writeFile('/downloads/notification.log', message, (err) => {
                        if (err) {
                            return console.log(err)
                        }
                        console.log('The file was saved')
                    })
                    continue;
                }
            }
        }

    }, 864000)
}
