const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const { body, validationResult } = require('express-validator');
const {registerValidation , loginValidation } = require('../validation');


router.post('/register', registerValidation , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].param});
    }

    const userExists = await User.findOne ({
        $or: [{ email: req.body.email}, { name: req.body.name }] 
    });
    if (userExists) {
        return res.status(400).send('User exists already');
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password , salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        return res.send(savedUser)
    }catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    
});


router.post('/login',loginValidation , async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].param});
    }
    const user = await User.findOne ( {
        email: req.body.email
    });
    if (!user) {
        return res.status(400).send('User does not exist');
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid pass')
    }

    // Create and assign a token
    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    


});

module.exports = router;