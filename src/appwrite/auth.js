import { use } from "react";
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID)
 
    this.account= new Account(this.client)
    }

    async CreateAccount({email,password,name}){
        try{
      const user = await this.account.create({
  userId: ID.unique(),
  email: email,
  password: password,
  name: name
});

       console.log(user); 
       if(user){
        
      return await this.Login({email, password});
       }else{
        return user
     
       }
        
        }catch(err){
            throw err;
            
        }
    }

    async Login ({email,password}){
        try{
   return await this.account.createEmailPasswordSession({
  email: email,
  password: password
});

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
     return await this.account.deleteSession("current");
        }catch(error){
            console.log(error);
            
        }
    }
}


const AuthServices = new AuthService()




export default AuthServices