const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define for paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather app',
		name: 'Joe Maylor',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Joe Maylor'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help!',
		name: 'Joe Maylor',
		helpText: 'Here\'s what you need to do...'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide a location'
		});
	}

	geocode(req.query.address, (error, { lat, long, location } = {}) => {

		if (error) {
			return res.send({
				error
			});
		}

		forecast(lat, long, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			})
	
		
	
		});
	});
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		// Using return stops the code, so that we don't try and send 2 responses.
		return res.send({
			error: 'You must provide a search term'
		})
	}
	console.log(req.query)
	res.send({
		products: [],
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Joe Maylor',
		errorMessage: 'Help article not foud'
	})
})

// 404
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Joe Maylor',
		errorMessage: 'Page not found.'
	})
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});