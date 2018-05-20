var ReactDOM = require('react-dom');
var React = require('react');
var WeatherApp = require('./components/WeatherApp.jsx');

ReactDOM.render(
    <WeatherApp />,
    document.getElementById('mount-point')
);