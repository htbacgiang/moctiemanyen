const {default : mongoose }= require("mongoose")

const dbConnect =() =>{
    try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connect succesfully");
    } catch (error) {
        console.log("Database connect error");
    }
}
module.exports = dbConnect;