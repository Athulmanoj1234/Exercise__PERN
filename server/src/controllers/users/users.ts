import { Request, Response } from "express";
import passport from "passport";
import { db } from "../..";


export const isLoggedOut = (req: Request, res: Response)=> {

    const sessionId = req.cookies['connect.sid'];

    //req.logout(function(err) {
      // if(err){
       // res.json({ messege: "cannot logout" });
      // }
       res.clearCookie('connect.sid').status(200).json({ messege: "cookie cleared successfully" });
       //const googleLogoutUrl = `https://accounts.google.com/Logout`;
       //res.redirect(googleLogoutUrl); 
    //})
   
} 

export const getUserProfile = async (req: Request, res: Response)=> {
    
    if(req.isAuthenticated()){
        console.log("request user is:" +req.user);

        db.query("SELECT * FROM users WHERE id = $1", [req.user], (err, userData)=> {
  
          if(err){
            return res.status(500).json({ messege: "error fetching userdetails" });
          }
  
          if (!userData || !userData.rows || userData.rows.length === 0) {
            console.log("No user data found in the database");
            return res.status(404).json({ message: "User data can't be accessed in the database" });
          }
            console.log("userdetails" +userData.rows[0]);
            return res.status(200).json(userData.rows[0]);
        }); 
    }else{
        res.status(401).json("unauthorised");
    }
}