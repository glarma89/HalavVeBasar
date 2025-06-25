const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const PORT = 5000;

const es = new Client({ 
    node: 'http://localhost:9200',
    compatibility: true,
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server is running');
});
app.post('/api/order', async (req, res) => {
  const order = req.body;

  const transformedProducts = Object.entries(order.products || {}).map(
    ([category, items]) => ({
      category,
      items
    })
  );

  try {
    const response = await es.index({
      index: 'orders',
      body: {
        name: order.name,
        address: order.address,
        email: order.email,
        products: transformedProducts,
        created_at: new Date(),
      },
    });

    res.status(201).json({
      message: 'Order saved successfully',
      id: response._id,
    });
  } catch (error) {
    console.error('Elasticsearch error:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
