import express,{Request,Response} from "express";
import cors from "cors";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000

console.log(PORT)
app.use(express.json());
app.use(cors());

app.get('/',(req:Request,res:Response) => {
    res.send('Hello world')
});

app.listen(PORT,()=>{
    console.log('Server rodando na porta :',PORT)
})