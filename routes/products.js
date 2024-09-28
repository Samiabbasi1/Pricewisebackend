const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/',(req,res) => {
    db.query('SELECT * FROM PRODUCTS', (err,results) => {
        if (err) throw err;
        res.json(results);
    });
});

router.post('/',(req,res)=>{
    const {name,category,brand,features} = req.body;
    db.query('INSERT INTO products (name,category,brand,features) VALUES (?,?,?,?)',[name,category,brand,features],(err,results)=>{
        if (err) throw err;
        res.json({message:'Product added',productId:results.insertId});
    })
})

router.put('/:id',(req,res) => {
    const {name,category,brand,features} = req.body;
    db.query('UPDATE products SET name=?,category=?,brand=?,features=? WHERE product_id=?',[name,category,brand,features,req.params.id],(err,results) => {
        if (err) throw err;
        res.json({message:'Product Updated'});
    });
});

router.delete('/:id',(req,res)=>{
    db.query('DELETE FROM products WHERE product_id=?',[req.params.id],(err,results) => {
        if (err) throw err;
        res.json({message:'Product Deleted'});
    });
})

module.exports=router;