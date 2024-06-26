
import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

export const appwriteconfig = {
projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
url: import.meta.env.VITE_APPWRITE_URL,
databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECITON_ID,
postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECITON_ID,
saveCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
}

export const client = new Client();

client.setProject(appwriteconfig.projectId);
client.setEndpoint(appwriteconfig.url);


export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
