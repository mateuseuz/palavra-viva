const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filePath = path.join(__dirname, 'visits.json');

app.get('/api/visits', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read visits file' });
    }
    const visits = JSON.parse(data);
    visits.count += 1;

    fs.writeFile(filePath, JSON.stringify(visits), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to update visits count' });
      }
      res.json({ count: visits.count });
    });
  });
});

module.exports = app;