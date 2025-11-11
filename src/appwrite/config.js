import conf from "../conf/conf";
import { Client, ID, Storage, Databases,Query  } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) 
      .setProject(conf.appWriteProjectID); 

    this.tablesDB = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }


  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createDocument(
        conf.appWriteDataBaseID,
        conf.appWriteTableID,   
        ID.unique(),
    
        
        
        
        {
        
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Create error:", error);
      throw error
    }
  }

  async updatePost(rowId, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow(
        conf.appWriteDataBaseID,
        conf.appWriteTableID,
        rowId, 
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Update error:", error);
      throw error;
    }
  }


  async deletePost(rowId) {
    try {
      return await this.tablesDB.deleteRow(
        conf.appWriteDataBaseID,
        conf.appWriteTableID,
        rowId,
    )
    return true
    } catch (error) {
      console.log("Delete error:", error);
      throw error;
      return false
    }
  }
  async getPost(rowid){
      try{
   return await this.tablesDB.getDocument(
        conf.appWriteDataBaseID,
        conf.appWriteTableID,
        rowid
    )

    }catch(error){
      console.log('GET PoST ERROR',error);
      
    }
  }
   

  async getAllPost (queries = [Query.equal('status' ,"active")]){
    try{
   return await this.tablesDB.listDocuments(
    conf.appWriteDataBaseID,
    conf.appWriteTableID,
    queries,
   )
    }catch(error){
        console.log('Get all post errro',error)
    }
  }
  
  // File upload services
  async uploadFile  (file){
    try{
     return await this.bucket.createFile(
        conf.appWriteBuketID,
        ID.unique(),
        file

     )
    }catch(error){
        console.log(('file uplooad eror',error));
        return false
        
    }

  }

  async deleteFile (fileid){
    try{
     return await this.bucket.deleteFile(
        conf.appWriteBuketID,
        fileid
     )
     return true
    }catch(error){
        console.log('delete file error',error);
        return false
        
    }

  }

  getfilePreview(fileid){
    return this.bucket.getFilePreview(
        conf.appWriteBuketID,
        fileid
    )
  }
}





const service = new Service();
export default service;
