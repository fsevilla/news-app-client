const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'dist', 'news-app-client')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'news-app-client', 'index.html'));
})

app.listen(port, () => {
  console.log('App is running in port ' + port );
})