import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'User profile retrieved successfully',
        user: req.user
    });
});
export default router;


router.get(
    "/admin/dashboard", 
    authMiddleware,
    roleMiddleware('admin'),
    (req, res) => {
        res.status(200).json({
            status: 'success',
            message: 'Admin dashboard accessed successfully',

        })
    }
)