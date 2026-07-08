import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"Unauthorized",
            succes: false,
            err: " Token not found"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded

        next()
    } catch(err){
        return res.status(400).json({
            message:"Unauthorized",
            succes: false,
            err: " Token not found"
        })
    }
}