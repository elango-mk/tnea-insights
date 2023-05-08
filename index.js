const fs = require('fs');
const express = require('express');
const actionUtils = require('./src/js/actionUtils');
const zlib = require('zlib');


// Create an instance of the Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));



// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
  
//allotment data 
(async () => {
  try {
    console.log("in async block");
    process.env.allotmentData = JSON.stringify( await actionUtils.getAllotmentObjects());
  } catch (err) {
    console.error(err);
  }
})();


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

app.get('/getData', async (req, res) => {
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
  //let data = await actionUtils.getAllotmentObjects();
  //console.log("App Data Length : " + data.length);
  //console.log(process.env.allotmentData);
  const compressedData = zlib.brotliCompressSync(Buffer.from(process.env.allotmentData));
  res.setHeader('Content-Encoding', 'br');
  res.send(compressedData);
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