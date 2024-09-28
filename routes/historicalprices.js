const express = require('express');
const route = express.Router();
const db = require('../config/db');
const router = require('./products');

router.get('/', (req, res) => {
  db.query('SELECT * FROM historical_prices', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { product_id, price, date } = req.body;
  db.query('INSERT INTO historical_prices (product_id, price, date) VALUES (?, ?, ?)', [product_id, price, date], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Historical price added', historicalPriceId: results.insertId });
  });
});

router.put('/:id',(req,res)=>{
    const {price, date} = req.body;
    db.query('UPDATE historical_prices SET price=?,date=? WHERE historical_price_id=?',[price,date,req.params.id],(err,results)=>{
        if(err) throw err;
        res.json({message:'Historical price updated'});
    });
});

router.delete('/:id',(req,res)=>{
    db.query('DELETE FROM historical_prices WHERE historical_price_id=?',[req.params.id],(err,results)=>{
        if(err) throw err;
        res.json({message: 'Historical price deleted'});
    });
});

module.exports=router;