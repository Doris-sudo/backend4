const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if(req.user.role !== requiredRole){
            return res.status(403).json({
                status: 'error',
                message: 'Access denied. You do not have permission to perfom this action'
            })
        }
        next();
    }
}
export default roleMiddleware;