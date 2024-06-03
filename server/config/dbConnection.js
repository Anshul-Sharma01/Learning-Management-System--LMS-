import mongoose, { connect } from "mongoose";

mongoose.set('strictQuery', false);

const connectionToDb = async () => {
    try{
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://localhost:27017/lms`
        )
    
        if(connection){
            console.log(`Conected to MongoDb : ${connection.host}`);
        }
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectionToDb;