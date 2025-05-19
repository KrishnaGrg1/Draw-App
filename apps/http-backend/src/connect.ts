import mongoose from "mongoose"
import ienv from "./env"

const connectToDB=async():Promise<string>=>{
    const DBUrl=ienv.MONGODB_URL;
    if(!DBUrl){
        return Promise.reject("Mongodb url isnot defined in environment variabels")
    }
    try{
        await mongoose.connect(DBUrl);
        return "MongoDB connected"
    }catch(e:any){
        if(e instanceof Error){
            return Promise.reject(e.message)
        }else{
            return Promise.reject("An unknown error has occurred")
        }
    }
}
export default connectToDB