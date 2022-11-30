import * as mongoose from "mongoose";

export const mongo = mongoose.createConnection('mongodb+srv://admin:admin@cluster0.xrxyjj3.mongodb.net/hospital?retryWrites=true&w=majority')
// async function main() {
//     await mongoose.connect('mongodb+srv://admin:admin@cluster0.xrxyjj3.mongodb.net/?retryWrites=true&w=majority',
//         {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             autoReconnect: true,
//             keepAlive: true,
//             connectTimeoutMS: 30000,
//         });
// }
// main().catch(err => console.log(err));
