import * as supertest from "supertest";
import {controllers} from "../app";
import MainApplication from "../main_application";
const application = new MainApplication(controllers)

describe('appointments', ()=> {
    describe('get apoointments route', ()=> {
        describe('Appointments does not exist', ()=> {
            it('should should return 404',  async ()=> {
                const { body} = await supertest(application.app).get('/appointment/list').expect(404)
                expect(body).toBe({})
            })
        })

        describe('Appointments does exist', ()=> {
            it('should should return a 200 and appointment list',  async ()=> {
                const {body, statusCode } = await supertest(application.app).get('/appointment/list').expect(200)
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.arrayContaining([expect.any(Object)]))
            })
        })

        describe('Create appointment', () => {
            it ('should should return a 200 and create new appointment', async () =>{
                const appointmantPayload = {
                    date:  `${new Date()}`,
                    user: 'fa92a681-a623-4c0a-b3cf-af1d044d800e',
                    doctor: "407e6bde-e131-406f-99a6-e352599ba316"
                }
                const {body, statusCode } = await supertest(application.app).post('/appointment/create').send(appointmantPayload)

                expect(statusCode).toBe(200)
                expect(body).toBe({
                    "_id": expect.any(String),
                    "date": "2022-12-01",
                    "user": "fa92a681-a623-4c0a-b3cf-af1d044d800e",
                    "doctor": "407e6bde-e131-406f-99a6-e352599ba316",
                    "active": true,
                    "__v": 0
                })
            })
        })
    })
})
