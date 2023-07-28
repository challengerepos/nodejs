const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sample data - We'll use an array to store the data
let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// GET all items
app.get('/api/items', (req, res) => {
  res.json(data);
});

// GET a single item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});

// POST a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT (update) an item by ID
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemIndex = data.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    data[itemIndex] = { ...data[itemIndex], ...updatedItem };
    res.json(data[itemIndex]);
  }
});

// DELETE an item by ID
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter((item) => item.id !== id);
  res.json({ message: 'Item deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});