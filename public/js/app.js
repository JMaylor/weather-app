const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');

const getWeather = (location) => {
	messageOne.innerHTML = 'Loading...';
	messageTwo.innerHTML = '';
	fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
		// messageOne.innerHTML = '';
		response.json().then(data => {
			if (data.error) {
				console.log(data.error);
				messageOne.textContent = data.error;
			} else {
				search.value = '';
				messageOne.innerHTML = data.location;
				messageTwo.innerHTML = data.forecast;
			}
		})
	})
}

weatherForm.addEventListener('submit', (e) => {
	// preventDefault stops the page refreshing on form submit
	e.preventDefault();

	const location = search.value;
	getWeather(location);

	console.log('form submitted :', location);
});