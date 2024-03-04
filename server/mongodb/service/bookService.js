import databaseProject from "../GetDataBase.js";

export const getBook=async (req,res)=>{
    const userID=req.params.ID;

    const user=await databaseProject.book.findOne({_id:new ObjectId(`${userID}`)} )
    return res.json(user);
}
export const deleteBook=async(req,res)=>{
  const userID=req.params.ID;

    const result=await databaseProject.book.deleteOne({_id:new ObjectId(`${userID}`)} )
    return res.json(result);
}
export const addBook=async(req,res)=>{
  const checkIsExist=await databaseProject.book.findOne({name:req.body.name,author:req.body.author})
  if(checkIsExist !=  "null"){
    return updateBook()
  }
  else{
    const newUser=new User(req.body)

    const result= await databaseProject.book.insertOne(newUser);
    return res.json(result)
  }
  
}
export const updateBook=async (req,res)=>{
  
  const result=await databaseProject.book.updateOne({name:req.body.name,author:req.body.author},req.body)
  return res.json(result)
}
export const getAllBook=async(req,res)=>{
    const result=await databaseProject.book.find().toArray()
  return res.json(result)
}
export const getFilterBook=async(req,res)=>{
  const query=req.query;
  if(Object.keys(query).length>0){
    if(query.publisher){
      const publisher=decodeURIComponent(query.publisher);
      const filterData=await databaseProject.book.find({publisher:publisher}).toArray()
        return res.json(filterData)
    }
    else if(query.type){
      const typeInput=decodeURIComponent(query.type);
      const filterData=await databaseProject.book.find({type:typeInput}).toArray()
      return res.json(filterData)
    }
    else if(query.author){
      const author=decodeURIComponent(query.author);
      const filterData=await databaseProject.book.find({author:author}).toArray();
      return res.json(filterData)
    }

  }
  else{
     return getAllBook()
  }
}