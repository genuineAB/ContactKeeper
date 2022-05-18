const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');



const User = require('../models/User');

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post('/', [
        body('name','Please add name').not().isEmpty(), 
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be minimum of 8 Characters').isLength({min: 8})
    ],  async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
         res.status(400).json({errors: errors.array()});
        }
    
        const {name, password, email} = req.body;

        try {
            let user = await User.findOne({email});

            if(user){
                return res.status(400).json({msg: 'User already exists'});
            } else {
                user =  new User({
                    name,
                    email,
                    password
                });
            }

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 360000}, (err, token) => {
                if(err) throw err;
                res.json({token});
            } );
 
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
            
        }
    }

);

module.exports = router;