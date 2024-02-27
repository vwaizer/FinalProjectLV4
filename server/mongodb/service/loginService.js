const privateKey=process.env.PRIVATE_KEY;
export const   createTokenLogin =  (data,privateKey) =>  {
  console.log(data);
  return  new  Promise((resolve, reject) => {
     jwt.sign(
      { username: data.username, password: data.password },
      privateKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err.message);
        }
        resolve(token);
      }
    );
  });
};
export const createLoginAccess= async(req,res)=>{
  
  const encrypt = {username:req.body.username,password: req.body.password };
  
  const token=  await createTokenLogin(encrypt,privateKey);
  return res.json({token});
}
