const express = require('express');
const app=express();
const knex = require('knex');
const session = require('express-session'); 
const connectEnsureLogin = require('connect-ensure-login');// authorization

const authHelpers = require('../../database/helpers.js');
const bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
const local=require('../../auth/locale');
const passport = require('passport');
const router= express.Router();
const db=require('../../database/cnx');

router.get('/', (req, res) => {
        db.select().from('User_Login').then(function(data){
            res.send(data)
        });});

        router.get('/:uuid', (req, res) => {
            db.select().from('User_Login').where({uuid:req.params.uuid}).then(function(data){
                res.send(data)
            });});
  
  
   
  
 

router.post('/register',function (req, res)  {
   const BCRYPT_SALT_ROUNDS=12;
    //  const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.login_password, BCRYPT_SALT_ROUNDS);
db.insert({
    uuid:req.body.uuid,
    login_email : req.body.login_email,
    login_password :hash,
    status:req.body.status
    //a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a45
    //$2a$12$X.LMZTjxDOzaTAASIoLfXOhtVtLNZEJ7dwpkm6R0YQDnYuzYmcAv6
    //$2a$12$uPMVL4qVYLS7uo3W8DhnSuZX.cpuYnsWum8l93I52eg7ZgBh0gfIK
}
).returning('*').into('User_Login').then(function(data){
    res.send(data) 
    console.log(req.sessionID)
    
    
            });});


 router.put('/changerpassword/:uuid', (req, res) => {
  db('User_Login').where({uuid:req.params.uuid}).update({
      login_email:req.body.login_email || null,
   login_password:req.body.login_password|| null,

      status:req.body.status || null,
     
    })
      .returning('*').then(function(data){
    res.send(data) 
        
});});


  


     //const {username, password} = req.body;


router.delete('/:uuid', (req, res) => {
    db('User_Login').where({uuid:req.params.uuid}).delete()
        .returning('*').then(function(){
      res.json({success: true}) 
                                                 
  });});

 module.exports=router;