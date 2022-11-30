import { Controller } from "./controller";
import {Appointment} from "../model/appointment_model";
import validationMiddleware from "../middleware/validation_middleware";
import Appointment_dto from "../dtos/appointment_dto";
import {Patient} from "../model/patient_model";
import {Doctor} from "../model/dockor_model";
import Appointment_update_dto from "../dtos/appointment_update_dto";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

class AppointmentController extends Controller {
    constructor() {
        super();
        this.appointmentList()
        this.appointmentCreate()
        this.appointmentUpdate()
    }

    public appointmentList() {
        this.router.get('/appointment/list', async (req: any, res: any) => {
            try {
                // @ts-ignore
                const appointmentList = await Appointment.getAppointmentList()
                if (!appointmentList) {
                    res.status(404).send('List is empty')
                } else {
                    const filteredAppointmentList = appointmentList.filter(item => item.data >= new Date()  )
                    const appointmentsToDelete = appointmentList.filter(item => item.data <= new Date()  )
                    for (let element of appointmentsToDelete) {
                        await Appointment.deleteOne({_id: element._id})
                    }
                    res.status(200).send(appointmentList)
                }
            } catch (e) {
                res.status(400).send(e.message)
            }

        })
    }


    public appointmentCreate() {
        this.router.post('/appointment/create', validationMiddleware(Appointment_dto), async (req:any, res: any) => {
            try {
                // @ts-ignore
                const validateAppointment = await Appointment.validateAppointment(req.body)
                if (validateAppointment.message ) {
                    res.status(400).send(validateAppointment.message)
                } else {
                    await Appointment.create({
                        _id: uuidv4(),
                        active: true,
                        ...req.body
                    })
                        .then(result => res.send(result))
                        .catch(e => res.send(e))
                }
            } catch (e) {
                res.send(e.message)
            }
        })
    }

    public appointmentUpdate() {
        this.router.put('/appointment/:id', validationMiddleware(Appointment_update_dto), async (req: any, res: any) => {
            try {
                const availableAppointment = await Appointment.findById(req.params.id).exec()
                if (!availableAppointment) {
                    return res.status(404).send({message: 'Appointment not found'})
                }
                const patient = await Patient.findById(req.body.user).exec()
                if (!patient) {
                    return res.status(404).send({message: `Patient with such id(${req.body.user}) not found`})
                }
                const doctor = await Doctor.findById(req.body.doctor).exec()
                if (!doctor) {
                    return res.status(404).send({message: `Doctor with such id(${req.body.doctor}) not found`})
                }
                if (doctor.appointments_accepted.includes(req.params.id)) {
                    return res.status(401).send({ message: 'Denied!! Appointment already accepted'})
                }
                const appointmentsOfTheDoc = await Doctor.find({
                    id: req.body.doctor
                }).exec()
                const docAppointmentInGivenDay =  appointmentsOfTheDoc.filter(apppintment => {
                    // @ts-ignore
                    const momentAppoint = moment(apppintment.date)
                    const momentReqAppoint = moment(availableAppointment.date)
                    return(momentAppoint.isSame(momentReqAppoint, 'day') && doctor.appointments_accepted.includes(apppintment.id))
                })
                if (docAppointmentInGivenDay.length>= 3) {
                    return res.status(401).send({message: 'Denied!! To much patients in one day! have a rest doc'})
                }
                if (req.body.action == 'reject') {
                    await Appointment.deleteOne({id: req.params.id}).then(result => res.send({message: 'Appointment has been deleted'}))
                } else if (req.body.action == 'approve') {
                    await Patient.updateOne({id: availableAppointment.user}, {"$push": {appointments: availableAppointment}})
                    await Doctor.updateOne({id: availableAppointment.doctor}, {"$push": {appointments_accepted: availableAppointment}})
                    return res.send('success')
                }
            } catch (e) {
                res.send(e.message)
            }
        })
    }

}

export default AppointmentController
