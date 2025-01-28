import express, { Request, Response } from "express";
import cors from "cors";
import pg, { QueryResult } from "pg";
import { genSaltSync, compareSync, hash, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import passport, { Profile, SessionOptions } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session, { Cookie } from "express-session";
import cookieSession from "cookie-session";
import { getUserProfile, isLoggedOut } from "./controllers/users/users";
import { adminLogin, adminLogout, adminRegister, getAdminProfile } from "./controllers/admin/admin";

interface adminInfo{
  username: string;
  password: string;
}

interface googleCredentials{
  clientId: string | undefined;
  clientSecret: string | undefined;
  }

/*interface User{
  id: string;
  displayName: string,
  name?: { familyName: string, givenName: string };
  emails?: [ { value: string, verified: boolean } ];
} */ 

interface CookieOptions{
  name: string;
  httpOnly: boolean;
}


dotenv.config();

const port = 3001;
const app = express();
const secret = process.env.SECRET;
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
let email: any;

export const db: pg.Client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "school",
    password: "athulDB", 
    port: 5432
});

//console.log("client id is :" + process.env.GOOGLE_CLIENT_ID + "secret is: " + process.env.GOOGLE_CLIENT_SECRET);

//connecting to postgres database 
try{
    db.connect();
    console.log("connected to database");
}catch(error){
    console.log("error connecting to database",error);
}
   
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",  
    }));
    
    
app.use(express.json());
app.use(cookieparser());

app.use(session({
  secret: "dsfds2454dfgfgfsd454",  // Session secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    name: "userToken",  // Custom session cookie name
    httpOnly: true,     // Make cookie inaccessible to JavaScript
    maxAge: 24 * 60 * 60 * 1000, // Cookie expires after 1 day
    secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
    sameSite: 'strict',  // CSRF protection
  } as CookieOptions
}));

app.use(passport.initialize()); 
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: client_id!, //assertion operation tells that these clientId and secretId is not undefined 
  clientSecret: client_secret!,
  callbackURL: "/auth/google/callback" 
} ,
   async (accessToken, refreshToken, profile, cb) => {
      //console.log(profile);
      //done(null, profile);
      const user: Express.User = {
        id: profile.id, // assuming `profile.id` is the unique identifier
        displayName: profile.displayName || '',
        emails: profile.emails || [],
        photos: profile.photos || [],
      };
      
      /*async function findEmail() {
        profile.emails?.forEach(eachEmail=> {
        email = eachEmail.value;
        return email;
      })
    } &=*/ 
      cb(null, user);

      await db.query(`CREATE TABLE IF NOT EXISTS users (
        id TEXT,
        username TEXT,
        email TEXT,
        profilePhoto TEXT
        );`);
      
      db.query("SELECT * FROM users WHERE id = ($1)", [profile.id], async function(err, rows) { 
          if(err) {
            return cb(err);
          }
          
          if(!rows.rows.length){
            //await findEmail();
           
            db.query("INSERT INTO users (id, username, email, profilephoto) VALUES ($1, $2, $3, $4)", [profile.id, profile.displayName, profile.emails?.[0]?.value, profile.photos?.[0].value], function(err) {
              
               if(err){
                return cb(err);
               }
               var user: Express.User = {
                id: profile.id,
                displayName: profile.displayName || '',
                emails: profile.emails || [],
                photos: profile.photos || [],
               };
               return cb(null, user); 
            });
            
          }
          
        });   
      }
      
   
));  

passport.serializeUser((user: Express.User, cb)=> {
  cb(null, user.id);
});

passport.deserializeUser((user: Express.User, done)=> {
  done(null, user); 
}); 

app.get('/auth/google', 
  passport.authenticate('google', {scope: ['profile', 'email']}) //tells Passport to authenticate using Google's OAuth 2.0 strategy. The scope specifies the access permissions that the app is requesting from the user, in this case, access to their Google profile and email address. 1
);

//after user authenticates with google, google will redirect them to the /auth/google/callback
app.get('/auth/google/callback', 
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/userprofile',
    failureRedirect: '/'}), 

);

app.post('/register', adminRegister);
app.post('/login', adminLogin);
app.post('/adminlogout', adminLogout);
app.get('/profile', getAdminProfile);
app.get('/userprofile', getUserProfile);
app.post('/logout', isLoggedOut);

app.listen(port, ()=> {
    console.log("server is listening"); 
}); 
   