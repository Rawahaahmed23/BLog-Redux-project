import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    Client = new Client();
    account;
    constructor(){
        this.Client
      .setProject(conf.appWriteProjectID)
    .setEndpoint(conf.appWriteUrl);
    this.account= new Account(this.Client)
    }

    async CreateAccount({email,password,name}){
        try{
       const user=  await this.account.create(ID.unique(),email,password,name)
       if(user){
        // call another
        this.Login({email,password})
       }else{
        return  user
       }
        
        }catch(err){
            throw err;
            
        }
    }

    async Login ({email,password}){
        try{
          return  await this.account.createEmailPasswordSession({email,password})

        }catch(error){
            throw error
        }
    }

    async CurrentUser(){
     try{
      return await this.account.get()
     }catch(error){
        console.log(error);
     }
     return null
    }

    async Logout (){
        try{
        return await this.account.deleteSessions()
        }catch(error){
            console.log(error);
            
        }
    }
}


const AuthService = new AuthService()




export default AuthService