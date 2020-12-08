const { body, validationResult } = require('express-validator');

const registerValidation =  [
    body('name').isLength({ min: 6 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
    ];

const loginValidation =  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
    ]

module.exports.registerValidation  = registerValidation;
module.exports.loginValidation = loginValidation ;
/* const Joi = require('joi');


// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        email: Joi.string()
            .email()
    });
    console.log(schema.validate(data , schema));
    return schema.validate(data , schema);

}

//login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        email: Joi.string()
            .email()
    });
    return schema.validate(data , schema);

}


module.exports.registerValidation  = registerValidation;
module.exports.loginValidation = loginValidation ; */