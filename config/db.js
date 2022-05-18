const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');



const connectDB = async () => {
    try{
        await mongoose.connect(db);
        
        console.log('Hoolahlah Connected');
    }catch(err){    
        console.error(err.message);
        process.exit(1);
    }
}
// const connectDB = () => {
//     await mongoose.connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }).then(() => console.log('MongoDb'))
//     .catch(err =>{
//         console.log(err.message);
//         process.exit(1);
//     })
// };

module.exports = connectDB;