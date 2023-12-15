import jwt from 'jsonwebtoken';

const authenticate = async(req , res , next) => {

    const token = req.cookies.token;

    try {

        const user = jwt.verify(token , process.env.JWT_SECRET1);

        req.user = user;

        next();

    } catch (error) {
        res.clearCookie("token");
        res.status(401).json({error : error.message});
    }
}

export default authenticate;