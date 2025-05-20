import express from "express";
import mainRoutes from "./routes/mainRoutes";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.use(mainRoutes);
app.listen(8001,()=>{
  console.log("Server started on port ",8081)
});
