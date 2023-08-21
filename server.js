const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://eepromuser:e3p20mp4ssw0rd@localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  nickname: String,
  currentDate: Date,
  cellContent: [Number],
  phCellUsage: [Number],
  phCellMapping: [Number],
});

const Item = mongoose.model('datas', ItemSchema);

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

