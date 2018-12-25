const express = require('express');

const app = exporess();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

	res.json({

		message: 'Scraping is Fun!'

  	});

})

app.listen(port, () => {

	console.log("Listening on ${port}");

})