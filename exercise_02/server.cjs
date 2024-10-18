const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const platesData = JSON.parse(fs.readFileSync('vietnameseVehiclePlates.json', 'utf8'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/provinces', (req, res) => {
  const provinces = platesData.map(item => item.city);
  res.json(provinces);
});


app.get('/api/plates/:city', (req, res) => {
  const city = req.params.city;
  const plateInfo = platesData.find(item => item.city === city);

  if (plateInfo) {
    res.json({ plate: plateInfo.plate_no });
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
