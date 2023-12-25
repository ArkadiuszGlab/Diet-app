const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Food = require('./models/Food');
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.get('/foods', async (req, res) => {
  try {
    const products = await Food.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Food.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndUpdate(id, req.body);
    if (!food) {
      return res
        .status(404)
        .json({ message: `cannot find product with this ID ${id}` });
    }
    const updatedFood = await Food.findById(id);
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res
        .status(404)
        .json({ message: `cannot find product with this ID ${id}` });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/foods', async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(200).json(food);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    `mongodb+srv://Arkadiuszglab:${process.env.API_KEY}@cluster0.ywbhg93.mongodb.net/dietApp-API?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('connected to MongoDB');
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => console.log(error));
