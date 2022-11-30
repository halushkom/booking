import { IController } from '../interface/interfaces'

import * as express from 'express'
import * as Validator from 'validate-typescript'

export class Controller implements IController {
    router: express.Router = express.Router()
    validator: typeof Validator

    constructor() {
        this.validator = Validator
    }

}
