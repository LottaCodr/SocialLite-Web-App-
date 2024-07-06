import { INewPost, INewUser } from "@/types";

import { ID, Query } from "appwrite";
import { account, appwriteconfig, avatars, databases, storage } from "./config";

//================ SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    //return newAccount;
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//========================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {

    console.log('Database ID:', appwriteconfig.databaseId);
    console.log('userCollection ID:', appwriteconfig.userCollectionId);
    const newUser = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.userCollectionId,
      
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

//======= SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

//=========== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}
//============= GET USER

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error)
  }

}

//create post
export async function createPost (post: INewPost) {
  try {
    //upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);
    
    if(!uploadedFile) throw Error;

    //Get file Url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if(!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    //convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //Create post
    const newPost = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      ID.unique(), {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags
      }
    );

    if(!newPost) {
       deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
    
  }
}


export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteconfig.storageId,
      ID.unique(),
      file
    );
    
    return uploadedFile;
    
  } catch (error) {
    console.log(error);
  }
}



export async function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteconfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    
    if(!fileUrl) throw Error;


    return fileUrl;
  } catch (error) {
    console.log(error)
  }
  
}

//DELETE FILE
export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteconfig.storageId, fileId);
      return { status: "ok" };
    } catch (error) {
      console.log(error);
      
    }
}

//GET POSTS
export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteconfig.databaseId,
    appwriteconfig.postCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)]
  )

  if (!posts) throw Error;

  return posts;
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      [Query.search("caption", searchTerm)]
          );

          if(!posts) throw Error;
          return posts;       
   } catch (error) { 
    console.log(error);
    
  }
}