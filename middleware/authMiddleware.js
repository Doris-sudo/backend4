import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const autHeader = req.headers.authorization;

    if(!autHeader){
        return res.status(401).json({
            status: 'error',
            message: 'Authorization header is missing'
        
        })
    }

    const token = autHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            status: 'error',
            message: 'Token is missing'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }catch(error){
    }
    return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
    })
}
export default authMiddleware;
