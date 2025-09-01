import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    // console.log("tokrn -" , token);
    
    if (!token) {
        return res.json({ success: false, message: "Not Authorize" })

    }
    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET);
        console.log("userid -" , userId);
        
        if (!userId) {
            return res.json({ success: false, message: "Not Authorize" })
        }
        req.user = await User.findById(userId).select("-password");
        console.log("req.user in protext -",req.user);
        
        next();

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
