const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const PORT = 5000;

// Elasticsearch client
const es = new Client({ 
    node: 'http://localhost:9200',
    compatibility: true,
});

// Middleware
app.use(cors());
app.use(express.json());

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Express server is running');
});

// Приём заказов
app.post('/api/order', async (req, res) => {
  const order = req.body;

  try {
    const response = await es.index({
      index: 'orders',
      body: {
        name: order.name,
        address: order.address,
        email: order.email,
        products: order.products,
        created_at: new Date(),
      },
    });

    res.status(201).json({
      message: 'Order saved successfully',
      id: response._id,
    });
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
