const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/',(req,res)=>{
    db.query('SELECT * FROM price_predictions', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

router.post('/',(req,res)=>{
    const {product_id, predicted_price} = req.body;
    db.query('INSERT INTO price_predictions (product_id,predicted_price) VALUES(?,?)',[product_id,predicted_price],(err,results)=>{
        if(err) throw err;
        res.json({message: 'Price Prediction MOdel',predictionId:results.insertId});
    });
});

router.put('/',(req,res)=>{
    const {predicted_price} = req.body;
    db.query('UPDATE price_predictions SET predicted_price = ? WHERE product_id = ?', [predicted_price,product_id],(err,results)=>{
        if(err) throw err;
        res.json({message:'Predicted Price Updated'});
    });
});

router.delete('/',(req,res)=>{
    db.query('DELETE FROM price_predictions WHERE prediction_id=?',[req.params.id],(err,results)=>{
        if(err) throw err;
        res.json({message:'Price Prediction Deleted'});
    });
});

module.exports = router;  //export the router to use in app.js

