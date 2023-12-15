import jwt from 'jsonwebtoken';

// verifying the token here
const checkResetPass = async(req , res , next) => {

    const resetToken = req.cookies.resetTokenJWT;

    try {

        const user = jwt.verify(resetToken , process.env.JWT_SECRET2);

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({error : error , message: error.message});
    }
}

export default checkResetPass;