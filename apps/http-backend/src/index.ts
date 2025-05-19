import express from "express";
import connectToDB from "./connect";
import mainRoutes from "./routes/mainRoutes";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors())
connectToDB().then((connectMessage) => {
  console.log(connectMessage);
    app.use(mainRoutes)
  app.listen(8001);
}).catch((e)=>{
    console.log(e)
});
