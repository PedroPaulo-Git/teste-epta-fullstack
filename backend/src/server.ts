import express,{Request,Response} from "express";
import cors from "cors";
import 'dotenv/config'
import authRoutes from "./routes/authRoutes";
import vehicleRoutes from './routes/vehicleRoutes'

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/api",vehicleRoutes)

app.listen(PORT,()=>{
    console.log('Server rodando na porta :',PORT)
})