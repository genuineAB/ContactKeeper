const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');



const User = require('../models/User');

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route    Post api/contacts
//@desc     Add new contact
//@access   Private
router.post('/',[auth, [body('name', 'Name is required').not().isEmpty()]], async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, email, phone, type} = req.body;
    // res.send('Add contact');

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const contact = await newContact.save();
    } catch (error) {
        console.error(error. message );
        res.status(500).send('Server Error')
    }
});

//@route    PUT api/contacts/:id
//@desc     Add new contact
//@access   Private
router.put('/:id', (req, res) => { 
    res.send('Update contact');
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete('/:id', (req, res) => { 
    res.send('Delete contact');
});

module.exports = router;