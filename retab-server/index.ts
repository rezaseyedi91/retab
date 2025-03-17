
import express from 'express';
import * as dotenv from 'dotenv'
import indexRouter from './routes/index'
import testRouter from './routes/test'
import cors from 'cors'
import { initVerovio } from './modules/mei-adapters/VerovioToolkitInstance';
import bodyParser from 'body-parser'
import multer from 'multer';
import cookieParser from 'cookie-parser';
dotenv.config();
const port = Number(process.env.PORT) as number
const app = express();

(async () => {

    try {


        try {
            await initVerovio();
        } catch (err) {
            console.log('err happened with verovio')
        }
        app.use(bodyParser.json());
        app.use(multer().any())
        app.use(cookieParser())
        app.use(cors({
            credentials: true,
            origin: [process.env.TAB_CLIENT_URL!], allowedHeaders: [`Access-Control-Allow-Origin: '${process.env.TAB_CLIENT_URL!}'`]
        }))
        app.use('/test', testRouter)
        app.use('/', indexRouter)
        app.get('/', (req, res) => {
            res.send('retab server api')
        })

        app.listen(port, () => {
            console.log('we are listening on port ' + port + '...')
        })


        // server.listen(port, '127.0.0.1' , () => {
        //         console.log('we are listening on port ' + port + '...')
        //     })

    } catch (mainErr) {
        console.log(mainErr)
    }
})();