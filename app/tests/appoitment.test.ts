import * as supertest from "supertest";
import {controllers} from "../app";
import MainApplication from "../main_application";
const application = new MainApplication(controllers)

describe('appointments', ()=> {
    describe('get apoointments route', ()=> {
        describe('Appointments does not exist', ()=> {
            it('should should return 404',  async ()=> {
                await supertest(application.app).get('/appointment/list').expect(404)
            })
        })

        describe('Appointments does exist', ()=> {
            it('should should return a 200 and appointment list',  async ()=> {
                const {body, statusCode } = await supertest(application.app).get('/appointment/list').expect(200)

                expect(statusCode).toBe(200)
                expect(body)
            })
        })
    })
})
