import { QueryResult } from "pg";
import { db } from "../..";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import express, {Request, Response} from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { userInfo } from "os";
import cookieParser from "cookie-parser";

interface AdminInfo{
    id: string;
    username: string;
    password: string;
}

dotenv.config();

const app = express();
const salt = genSaltSync(10);
const secret: string | undefined = process.env.SECRET;

app.use(express.json());
app.use(cookieParser());

async function ensureAdminTableExists(){
    try{
      //inserting to the table if the table not exists
      await db.query(`CREATE TABLE IF NOT EXISTS admin (  
        id SERIAL PRIMARY KEY,
        username TEXT,
        password TEXT 
        );` 
      );
    }catch(error){
      console.log("error creating table");
    } 
}

export const adminRegister = async (req: Request, res: Response)=> {
    const {username, password } = req.body;
       console.log(req.body);
    
       try{  
          await ensureAdminTableExists();
          //inserting values along with the creation of table in the database
          const hashedpassword = hashSync(password, salt);
          const result: QueryResult = await db.query("INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING *", [username, hashedpassword]);
          console.log(result);

          res.json(result); 
        }catch(error){
          console.log("admin info insertion failed", error);
        }
}

export const adminLogin = async (req: Request, res: Response)=> {
    const {username, password} = req.body;
    
      const adminInfo: AdminInfo | QueryResult= await db.query("SELECT * FROM admin WHERE username = ($1)", [username]); //find row based on username
      const isPassOk: boolean = compareSync(password, adminInfo.rows[0].password);
    
      const adminName = adminInfo.rows[0].username;
      const adminId = adminInfo.rows[0].id;
    
      if(isPassOk){
        jwt.sign({adminName, adminId}, secret!, {}, (err: Error | null, token: string | undefined)=> {
          if(err){ 
            res.json(err);
          }else{
            res.cookie('adminToken', token).json({
              adminId,
              adminName
            });
          } 
        });
      }else{
        res.json("sent correct admin  credentials");
      }
}

export const getAdminProfile = async (req: Request, res: Response): Promise<void>=> {
    const { adminToken } = req.cookies;
    
    if(adminToken){
        jwt.verify(adminToken, secret!, {}, (err: Error | null, adminInfo: any)=> {
            if(err){
                return res.status(400).json({ messege: "cookies didnt recieved" });
            }else{
                //console.log(adminInfo.adminId);
                db.query("SELECT * FROM admin WHERE id = ($1)", [adminInfo.adminId], (err, adminDetails)=> {
                    if(err){
                        res.status(404).json({ messege: "admin info dont found" });
                    }else{
                        //console.log(adminDetails.rows[0]);
                        res.status(200).json(adminDetails.rows[0])
                    }
                })            
            }
        })
    }else{
        res.status(401).json({ messege: "authorization failed" }); 
    }
}

export const adminLogout = (req: Request, res: Response)=> {
    const { adminToken } = req.cookies;

    if(adminToken){
        res.clearCookie('adminToken').json({ messege: "cookie cleared successfully" });
    }else{
        res.status(401).json({ messege: "unauthorised" });
    }
}