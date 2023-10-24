
const express = require('express');
const app = express();
const http = require('https');

app.set('view engine', 'ejs');

const hostname = '127.0.0.1';
const port = 3000;

app.get("/top",(request,response) => {
  const options = {
    method: 'GET',
    hostname: 'imdb-top-100-movies.p.rapidapi.com',
    port: null,
    path: '/top100movies',
    headers: {
      'X-RapidAPI-Key': '68368eb9f0mshb4113e8f2f0ad7dp1c2c45jsnf51c7d513f9e',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  const req = http.request(options, function (res) {
    const chunks = [];
  
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });
  
    res.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      let data = JSON.parse(body);
      response.render('index.ejs',{movie:data})
    });
  });
  req.end();
});


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



