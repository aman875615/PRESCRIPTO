import jwt from "jsonwebtoken"

const authDoctor = async (req,res,next) => {
  try {

    const { authorization } = req.headers
    
    if(!authorization){
      return res.json({success:false,message:"Not Authorized Login again"})
    }

    const token = authorization.split(' ')[1]
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)

    req.docId = token_decode.id
    console.log("Doctor ID from token: ", req.docId)  
    

    next()

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export default authDoctor