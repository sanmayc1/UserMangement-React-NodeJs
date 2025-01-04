import jwt from 'jsonwebtoken'



const tokenGenerate=(userDetails)=>{
   const secretKey = process.env.SECRET_KEY;
   return jwt.sign(userDetails, secretKey, { expiresIn: "1h" });
}

export default tokenGenerate;