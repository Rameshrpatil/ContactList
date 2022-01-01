const express = require('express');
//const contacts = require('../models/contacts');
const router = express.Router();

const Contact = require('../models/Contacts');

// retriving contact
router.get('/contacts',(req, res, next)=>{
    Contact.find(function(err,Contacts){
        res.json(Contacts);
    });

});

//add Contact
router.post('/contacts', (req,res,next)=>{
    console.log({req:req.body})
    var newContact = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone,
        email: req.body.email
    });

    newContact.save((err,Contact)=>{
        if(err)
        {
            console.log(err);
            res.send({msg:'failed to add Contact',Contact});
        }
        else{
            res.send({msg:'Contact added successfully'});
        }
    });
});

//delete Contacts
router.delete('/contacts/:id',(req,res,next)=>{
    Contact.remove({_id: req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    });


});

//update Contacts
router.put('/contacts',(req,res,next)=>{
    if({_id: req.params.id})
    {
    var myquery = { $get: {first_name: req.first_name, last_name: req.last_name,  phone: req.phone,email: req.email }  };
    };
    var newvalues = { $set: {first_name: req.body.first_name, last_name: req.body.last_name,  phone: req.body.phone,email: req.body.email } };
    Contact.updateOne( myquery, newvalues ,function(
        err,
        result
      ) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          res.json(result);
        }
      });
    });
 
module.exports = router;