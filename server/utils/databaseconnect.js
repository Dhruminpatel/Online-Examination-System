const mongoose= require('mongoose')
// const URL="mongodb://127.0.0.1:27017/mern_admin";

const URI= process.env.MONGODB_URI;
// mongoose.connect(URL)
const connectdb= async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connecion successfull to database")
    } catch (error) {
        console.log("database connection failed")
        console.log(error)
        process.exit(0);
    }
}

module.exports= connectdb;