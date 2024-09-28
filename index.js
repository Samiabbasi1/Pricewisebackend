const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const priceProductionRouter = require('./routes/priceprediction');
const historicalPriceRouter = require('./routes/historicalprices');
const reviewsRouter = require('./routes/reviews');
const orderRouter = require('./routes/orders');
app.use(express.json());

app.use('/api/products',productsRouter);
app.use('/api/users',usersRouter);
app.use('/api/price-predictions',priceProductionRouter);
app.use('/api/historical-prices',historicalPriceRouter);
app.use('/api/reviews',reviewsRouter);
app.use('/api/orders',orderRouter);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => { 
    res.send('Price-Wise Backend');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});