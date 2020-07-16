const request = require('request');

const weatherStackKey = 'f2244d351143d557040d0cc453e7342f';
const unitType = 'm'

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${weatherStackKey}&query=${lat},${long}&units=${unitType}`;

	request({ url, json: true}, (error, { body }) => {
		if (error) {
			callback('Could not connect to weather service', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			const data = body.current;
			callback(undefined, `It's ${data.weather_descriptions[0]} today. The temperature is ${data.temperature} degrees and it feels like ${data.feelslike} degrees.`);
		}
	})
};

module.exports = forecast;