import express,{Request,Response} from "express";
import cors from "cors";
import 'dotenv/config'
import authRoutes from "./routes/authRoutes";
import vehicleRoutes from './routes/vehicleRoutes'

const app = express();
const PORT = process.env.PORT || 5000

const RAILWAY_FRONTEND_URL = process.env.RAILWAY_FRONTEND_URL; // This will come from Railway's environment variables
const LOCAL_FRONTEND_URL = process.env.LOCAL_FRONTEND_URL || 'http://localhost:3000'; // This will come from your backend/.env or fallback

let allowedOrigins: string[] = [LOCAL_FRONTEND_URL];

if (RAILWAY_FRONTEND_URL) {
    allowedOrigins.push(RAILWAY_FRONTEND_URL);
}


app.use(cors({
    origin: function (origin, callback) {
      // Permitir requisições sem origem (como de ferramentas locais)
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS: ' + origin));
      }
    },
    credentials: true,
  }));

app.use(express.json());


app.use("/auth", authRoutes);
app.use("/api",vehicleRoutes)

app.listen(PORT,()=>{
    console.log('Server rodando na porta :',PORT)
})