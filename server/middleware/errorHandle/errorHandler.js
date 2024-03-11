export const errorHandle=(req,res,err)=>{
    if(err){
        
        throw new Error(err)
    }
}