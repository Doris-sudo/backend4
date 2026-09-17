import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../data/users.js'

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body


    if (!username || !email || !password || !role) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all required fields'
        })
    }



    const extinguisher = users.find(user => user.email === email)

    if (extinguisher) {
        return res.status(409).json({
            status: 'error',
            message: 'User already exists'
        })
    }

    const hashed = await bcrypt.hash(password, 10)

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashed,
        role
    }

    users.push(newUser)

    return res.status(201).json({
        status: 'success',
        message: 'User resistered successfully'
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid email or password'
        })
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid email or Invalid password'
        })
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    },
        process.env.JWT_SECRET, {
        expiresIn: '1h'
    }
    );

    return res.status(200).json({
        status: 'success',
        message: 'Login Successful',
        token
    })
}
export { registerUser, loginUser }