const jwt=require('jsonwebtoken')

 const auth=(req,res,next)=>{

    console.log(req.cookies,"cookiess")
    const token=req.cookies.jwt//or we can access like req.cookies.jwt
    if(!token)
        res.status(403),send("Login First");

        //decode jwt tokem
        try{
            const decode=jwt.verify(token,process.env.SECRET_KEY)
            req.token_val=decode;
            
        }catch(err){
            console.log(err)
            res.status(401).send("Invalid")
        }
      
       
        return next()
}

module.exports=auth