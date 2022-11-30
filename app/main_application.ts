require('dotenv').config()
import express = require('express')
import "reflect-metadata"
import { Controller } from './controller/controller'
import ErrorHandlerMiddleware from './middleware/error_middleware'
//import JWTMiddleware from './middleware/jwt_middleware'
//import jwt = require('express-jwt');
//import jwksRsa = require('jwks-rsa');
const multer = require("multer");
import {notificationService} from "./services/notification";


class MainApplication {
    public app: express.Application;
    public origins: Array<string> = [
        '*'
    ];

    public accessControl = (req: any, res: any, next: any) => {
        this.origins.forEach(function (origin) {
            res.header('Access-Control-Allow-Origin', origin);
        });
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    };


    public imageFilter = (req: any, filedata: any, cb: any) => {
        // accept image only
        if (!filedata.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image and pdf files are allowed!'), false);
        }
        cb(null, true);
    };

    public storage = multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            if (file.fieldname === 'photo_avatar') {
                cb(null, 'C:\\Users\\halus\\WebstormProjects\\booking_app\\app\\downloads\\')
            }
        },
        filename: function (req: any, file: any, cb: any) {
            if (file.fieldname === 'photo_avatar') {
                cb(null, file.originalname)
            }
        }
    })


    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }


    public listen() {
        notificationService()
        this.app.listen(process.env.PORT, () => {
            console.log(`MainApplication listening on the port ${process.env.PORT}`);
        }).keepAliveTimeout = 2 * 60 * 1000;
    }


    public dispose() { }


    private initializeMiddlewares() {
        this.app.use(this.accessControl);
        this.app.use(express.json())
        this.app.use(express.static('downloads'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(multer({ storage: this.storage, fileFilter: this.imageFilter }).fields([
            { name: "photo_avatar", maxCount: 1 },
        ]))
        //this.app.use(JWTMiddleware.jwtHandler)
    }

    private initializeErrorHandling() {
        this.app.use(ErrorHandlerMiddleware.errorMiddleware)
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}

export default MainApplication
