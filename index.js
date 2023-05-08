const fs = require('fs');
const express = require('express');
const actionUtils = require('./src/js/actionUtils');

// Create an instance of the Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
  


app.get('/', (req, res) => {
	fs.readFile('./client/html/home.html', 'utf8', (err, html) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
      return;
    }

    const modifiedHtml = html;
    res.send(modifiedHtml);
  });
});

/*app.get('/getData', async (req, res) => {
    let data = await actionUtils.getAllotmentData();
    console.log("App Data Length : " + data.length);
    res.send(data);
});
app.get('/getAllotmentArrays', async (req, res) => {
  let data = await actionUtils.getAllotmentArrays();
  console.log("App Data Length : " + data.length);
  res.send(data);
});
app.get('/getAllotmentObjects', async (req, res) => {
  res.setHeader('Content-Encoding', 'br');
  const allotmentDataCache = memCache.get('compressedAllotmentData');
  if (allotmentDataCache) {    
    console.log("inside cached content");
    res.send(allotmentDataCache);
  }
  else{
    console.log("inside non cached content");
    const compressedAllotmentData = await actionUtils.getAllotmentObjects();  
    res.send(compressedAllotmentData);
    memCache.put('compressedAllotmentData', compressedAllotmentData);
    console.log('end of non cached content');
  }
});*/

app.get('/allotmentData', async (req, res) => {
  const filePath = './db/compressedAllotmentData.br';
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;

  res.setHeader('Content-Encoding', 'br');
  res.setHeader('Content-Length', fileSize);
  res.setHeader('Content-Type', 'application/json');

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});



// Close the database connection when the server is shutting down
app.get('/shutdown', (req, res) => {
    res.send('Shutting down server...');
    server.close(() => {
      sqlite.closeDbConnection(db);  
      console.log('Server has been shut down.');
      process.exit(0); // exit the Node.js process
    });
  });