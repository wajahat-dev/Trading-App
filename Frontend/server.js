const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
debugger
app.use(express.static(path.join(__dirname, '/../dist')));
  app.use('/data', express.static(__dirname + '/data'));
  app.use(express.static(__dirname))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
  });
app.listen(port);
