import { ID ,Query,Operator} from "appwrite";
import { tablesDB,storage,databases } from "./config";
import { data } from "react-router";

const db = import.meta.env.VITE_DB_ID;
const usercoll = import.meta.env.VITE_User_ID;
const bid =import.meta.env.VITE_Bucket_ID
const postid = import.meta.env.VITE_POST_ID
// insert data into user table
export const createUser = async (data, userid) => {
  try {
    const result = await tablesDB.createRow({
      databaseId: db,
      tableId: usercoll,
      rowId: ID.unique(),
      data: {
        userid:userid ,
        email: data.email,
        fullname: data.fullname,
      },
    });
    console.log("user created", result);
  } catch (error) {
    console.log("error occured while creating user", error);
  }
};





export const getuser =async(id)=>{

try{
  const res = await tablesDB.listRows({
    databaseId: db,
    tableId: usercoll,
    queries: [
        Query.equal('userid', id)
    ]
});
return res
}
catch(e){
console.log(e)
}


}



// update profile 
export const updateprofile=async(data,did,)=>{
try{

     let img=""
    
        if(data?.image[0] instanceof File){
  const res = await storage.createFile({
    bucketId:bid,
    fileId:ID.unique(),
    file:data.image[0]
  })

    img =  storage.getFileView({
    bucketId:bid,
    fileId:res.$id
  })
  console.log("img",img)
}

let d = {}
  if(img){
   d.fullname=data.fullname,
      d.bio=data.bio
      d.image=img
  }
  else{
    d.fullname=data.fullname,
      d.bio=data.bio
    }


 console.log(did)

  const promise = await tablesDB.updateRow(
    db,
    usercoll,
    did,
    {
      
      ...d
      
     }
);
}
catch(e){
  console.log("error while updating",e)
}
}




// post create 


export const createPost = async (data, userid) => {
  try {
           let userdoc = await tablesDB.listRows({
    databaseId: db,
    tableId:usercoll,
    queries: [
        Query.equal('userid', userid)
    ]
});
console.log(userdoc)

  const res = await storage.createFile({
    bucketId:bid,
    fileId:ID.unique(),
    file:data.thumbnail[0]
  })

  const img =  storage.getFileView({
    bucketId:bid,
    fileId:res.$id
  })

    const result = await tablesDB.createRow({
      databaseId: db,
      tableId: postid,
      rowId: ID.unique(),
      data: {
      title:data.title,
      category:data.category,
      description:data.description,
      status:data.status,
      thumbnail:img,
      userid:userid,
      fullname:userdoc.rows[0].fullname,
      image:userdoc.rows[0].image


      },
    })

 


 const promise = await tablesDB.updateRow(
    db,
    usercoll,
    userdoc.rows[0].$id,
    {
         post:Operator.arrayAppend([userid])
    })


    
    console.log("post created", result);
  }
   catch (error) {
    console.log("error occured while creating user", error);
  }
};





// GEt All uSerpOsts

export const Getalluserpost=async(id)=>{
  try{
  const res = await tablesDB.listRows({
    databaseId: db,
    tableId: postid,
    queries: [
        Query.equal('userid', id)
    ]
});
return res
  }
  catch(e){
console.log("error found while fethcing user posts",e)
  }
}



// get single post data

export const Getsinglepost=async(id)=>{
  try{
  let d=await   tablesDB.getRow({
    databaseId: db,
    tableId: postid,
    rowId: id // The ID of the post you want to retrieve
});
return d
  }
  catch(e){
    console.log(e)
  }
}




// delet post 

export const Deletpost = async(rowid)=>{
try{
const result = await tablesDB.deleteRow({
    databaseId:db,
    tableId: postid,
    rowId: rowid,
});

console.log(result);
}catch(e){
  console.log(e)
}
}



// updte post 

export const updatesinglenpost=async(data,docid)=>{
    try{
      let img;
      console.log(data)
        if(data?.thumbnail[0] instanceof File){
  const res = await storage.createFile({
    bucketId:bid,
    fileId:ID.unique(),
    file:data.thumbnail[0]
  })

   img =  storage.getFileView({
    bucketId:bid,
    fileId:res.$id
  })
}

let d = {}
  if(img){
  d.title=data.title,
      d.category=data.category,
      d.description=data.description,
      d.status=data.status
      d.thumbnail=img
  }
  else{
     d.title=data.title,
      d.category=data.category,
      d.description=data.description,
      d.status=data.status
    }
          const updateddata= await tablesDB.updateRow(
   db,
    postid,
    docid,
     
    {
      ...d
       
     }
);
console.log("post updatd",updateddata)
    }
    catch(error){
        console.log("error occured while updating post"+error)
    }
}






// get all posts


 export const getPosts = async () => {
    try {
      const res = await databases.listDocuments(
        db,   // database id
        postid // collection id
      );
return res
      
    } catch (error) {
      console.log("Error:", error);
    }
  };




  // get blog 


  export const Getsingleblog=async(id)=>{
  try{
  let d=await   tablesDB.getRow({
    databaseId: db,
    tableId: postid,
    rowId: id // The ID of the post you want to retrieve
});
return d
  }
  catch(e){
    console.log(e)
  }
}