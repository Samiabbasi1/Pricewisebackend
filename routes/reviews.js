const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM reviews', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { product_id, user_id, rating, comment } = req.body;
  db.query('INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)', [product_id, user_id, rating, comment], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Review added', reviewId: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  const { rating, comment } = req.body;
  db.query('UPDATE reviews SET rating=?, comment=? WHERE review_id=?', [rating, comment, req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Review updated' });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM reviews WHERE review_id=?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Review deleted' });
  });
});

module.exports = router;
