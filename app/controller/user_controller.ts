import { Controller } from "./controller";
import validationMiddleware from "../middleware/validation_middleware";
import CreatePatientDto from "../dtos/create_patient_dto";
import {Patient} from "../model/patient_model";

class UserController extends Controller {
    constructor() {
        super()
        this.createPatient()
        this.getPatientById()
    }

    private createPatient() {
        let path = '/patient/create';
        this.router.post(path, validationMiddleware(CreatePatientDto), async (request: any, response: any) => {
            try {
                console.log(request.body)
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
                console.log('2')
                // @ts-ignore
                await Patient.createUser(request.body).then((r: any) => {
                    response.send(r)
                })

            } catch (error) {
                response.status(500).send(error)
            }
        })
    }

    private getPatientById() {
        this.router.get('/patient/:id', async (req: any, res: any)=> {
            try {
                const patient = await Patient.findById(req.params.id)
                if ((Object.keys(patient)).length==0) {
                    return res.status(404).send({message: 'Patient with such id does not exist'})
                } else {
                    res.status(200).send(patient)
                }
            } catch (e) {
                return res.status(404).send(e.message)
            }
        })
    }


}

export default UserController

