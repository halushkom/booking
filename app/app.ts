import MainApplication from './main_application'
import { Controller } from './controller/controller';
import UserController from './controller/user_controller';
import AppointmentController from "./controller/appointment_controller";
import DoctorController from "./controller/doc_controller";


export const controllers: Controller[] = [
    new UserController(),
    new AppointmentController(),
    new DoctorController()

];

export const application = new MainApplication(controllers);
application.listen();
