export const errorHandle=(req,res,err)=>{
    if(err){
        
        return res.json(err)
    }
}