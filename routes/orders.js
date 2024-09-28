const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { user_id, product_id, quantity, status } = req.body;
  db.query('INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)', [user_id, product_id, quantity, status], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Order added', orderId: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  const { quantity, status } = req.body;
  db.query('UPDATE orders SET quantity=?, status=? WHERE order_id=?', [quantity, status, req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Order updated' });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM orders WHERE order_id=?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Order deleted' });
  });
});

module.exports = router;
