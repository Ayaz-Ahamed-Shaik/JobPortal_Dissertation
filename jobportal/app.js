import express from "express"
import helmet from "helmet"
import cors from 'cors'
import {errorMiddleware} from "./middlewares/error.js"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import router from './routes/router.js';
  dotenv.config({path: './.env',});
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 3000;
  
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';

connectDB(mongoURI);
  
  const app = express();
  
                          
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin:' * ',credentials:true}));
app.use(morgan('dev'))
app.use('/joining',router);

    
app.get("*", (req, res) => {
    res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });
  
  app.use(errorMiddleware);
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  