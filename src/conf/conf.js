

const conf = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appWriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appWriteDataBaseID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appWriteTableID: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  appWriteBuketID: String(import.meta.env.VITE_APPWRITE_BUKET_ID),

}

export default conf
