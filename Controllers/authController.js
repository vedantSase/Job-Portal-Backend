const User = require('../Models/userModel');
const colors = require('colors');
const { isAuthenticated, generateToken } = require('../Middleware/jwtAuth');
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists, Please Login'
            })
        }
        const newUser = User(req.body);
        await newUser.save();
        const token = generateToken(newUser.name, newUser.id);
        console.log('Token =', token);
        console.log(newUser.name + '--->registered successfully'.bgMagenta);
        res.status(200).send({
            success: true,
            message: 'User registered successfully',
            data: newUser,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: 'Error in registering user',
            success: false
        })
    }
} 


exports.loginUser = async (req, res) => {
    const {email, password} = req.body ;

    //  check f mail and password exist in body
    if(!email || !password){
        return res.status(400).send({
            success: false,
            message: 'Email and password are required'
        });
    }
    try {
        //  find user by email
    const user = await User.findOne({ email });
        console.log(user);
    //  check if user already exists in database or not
    if(!user)
        return res.status(404).send({
            success: false,
            message: 'User not found'
        });

    //  if user already exist compare password with stored password
    const matchedPassword = await user.comparePassword(password);
    console.log(password);

    //  if password doesn't matches
    if(!matchedPassword)
        return res.status(401).send({
            success: false,
            message: 'Invalid password'
        });

    const token = generateToken(user.name, user.id);
    console.log(user.name," Login Successfully ".green);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token: token,
        user : user
    })
    } catch (error) {
        console.log('Error while Logging in...'.bgRed);
        return res.status(500).send({
            success: false,
            message: 'Server Error at authController'
        });
    }
}