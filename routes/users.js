const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { route } = require('./products');

router.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    db.query('INSERT INTO users (username,password,email) VALUES (?,?,?)',[username,hashedPassword,email],(err,results)=>{
        if(err) throw err;
        res.json({message: 'User Registered',userId: results.insertId});
    });
});

router.post('/login',(req,res)=>{
    const {username,password} = req.body;
    db.query('SELECT * FROM users WHERE username=?',[username],(err,results)=>{
        if(err) throw err;
        if(results.length===0 || bcrypt.compareSync(password,results[0].password)){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token = jwt.sign({userId:results[0].user_id},process.env.JWT_SECRET, {expiresIn:'1h'});
        res.json({token});
    });
});

module.exports=router;