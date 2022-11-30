import express = require('express')

let router = express.Router()
export interface IController {
    router : express.Router
    validator : any
}
