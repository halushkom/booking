import {Controller} from "./controller";
import validationMiddleware from "../middleware/validation_middleware";
import {Doctor} from "../model/dockor_model";
import Doctor_dto from "../dtos/doctor_dto";
import {Appointment} from "../model/appointment_model";

class DoctorController extends Controller {
    constructor() {
        super();
        this.createDoc()
        this.doctorsList()
    }
    private createDoc() {
        let path = '/doctor/create';
        this.router.post(path, validationMiddleware(Doctor_dto), async (request: any, response: any) => {
            try {
                // @ts-ignore
                const imageArr = request.files
                let filename
                if (!!imageArr.photo_avatar) {
                    //@ts-ignore
                    imageArr.photo_avatar.forEach(element => {
                        filename = element.originalname
                    })
                }
                request.body.photo_avatar = filename
                // @ts-ignore
                await Doctor.createUser(request.body).then((r: any) => {
                    response.send(r)
                })
            } catch (error) {
                response.status(500).send(error)
            }
        })
    }

    private doctorsList() {
        this.router.get('/doctor/list/:date', async (req: any, res: any) =>{
            let { date } = req.params
            if (!date) {
                date = new Date()
            }
             let freeDocInChoosenDay = []
            const docsList = await Doctor.find({})
            for (let doc of docsList) {
                let currentDocsApointmenst = await Appointment.find({doctor: doc._id})
                const appointInChoosenDay = currentDocsApointmenst.filter(item => item.date === date)
                freeDocInChoosenDay.push({
                    ...doc,
                    free: appointInChoosenDay.length < 3
                })
            }
            if (freeDocInChoosenDay.length == 0) {
                return res.send({message: 'Choose another day. All doctors are busy'})
            }
            res.send(freeDocInChoosenDay)
        })
    }
}

export default DoctorController
