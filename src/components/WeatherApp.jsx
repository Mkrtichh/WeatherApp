var React = require('react');
var axios = require('axios');

require('./WeatherApp.css');




var WeatherApp = React.createClass({
    getInitialState: function() {
        return {
            city: '',
            weatherData: {
                temperature: '',
                pressure: '',
                cloudy: '',
                humidity: '',
                speed: '',
                sunset: '',
                sunrise: '',
                mintemp: '',
                maxtemp: ''
            }
        };
    },

    handleTextChange: function(event) {
        this.setState({ city: event.target.value });
    },
    handleOptionChange: function(event) {
        this.setState({ tempType: "&" + event.target.value });
        this.setState({ selectClear: null });
    },
    showMoreInfo: function() {
        this.setState({ extended: true });
    },
    handleCityAdd: function() {
        if(this.state.tempType === undefined) {
            this.state.tempType = '';
        }
        var ulData = {
            city: this.state.city,
            tempType: this.state.tempType,
        }
       if(ulData.city) {
           this.setState({ selectClear: '' });
           axios.get('https://api.openweathermap.org/data/2.5/weather/?q='+ ulData.city + ulData.tempType+ '&appid=ff2c0c18fa0989f1b0d38d5f5b880403')
           .then(function (response) {
               this.state.weatherData.temperature = response.data.main.temp;
               this.state.weatherData.pressure = response.data.main.pressure;
               this.state.weatherData.cloudy = response.data.weather[0].main;
               this.state.weatherData.humidity = response.data.main.humidity;
               this.state.weatherData.speed = response.data.wind.speed;
               this.state.weatherData.sunrise = (new Date(response.data.sys.sunrise)).toString();
               this.state.weatherData.sunset = (new Date(response.data.sys.sunset)).toString();
               this.state.weatherData.mintemp = response.data.main.temp_min;
               this.state.weatherData.maxtemp = response.data.main.temp_max;

               this.setState({ selectClear: '' });

           }.bind(this)).catch(function (error) {
               
                this.setState({ cityEror: 'city not found' });
               
               console.log(error);
           }.bind(this));
       }
         var city = this.state.city;
        
         var newCity = {
            city: this.state.city,
            tempType: this.state.tempType
        };

        this.setState({ city: '' });
        this.setState({ tempType: '' });
        this.setState({ cityEror: null });

    },

    render: function() {
        if(this.state.weatherData.temperature) {
            var info = <div className="info">  <b>temperature</b>  <span>{this.state.weatherData.temperature}</span><b> | pressure</b> <span>{this.state.weatherData.pressure}</span> <b> | humidity</b> <span>{this.state.weatherData.humidity}</span></div>
        }
        if(this.state.extended) {
            var extendInfo =  <div>
            <table>
                   <tr>
                   <b>Temperature:</b> {this.state.weatherData.temperature}</tr>
                 <tr>
                   <th>More about</th>
                       <th>Other</th>
                   </tr>
                   <tr>
                       <td><b>Max Temperature:</b> {this.state.weatherData.maxtemp}</td>
                       <td><b>Sunrise: </b>{this.state.weatherData.sunrise}</td>
                   </tr>
                   <tr>
                       <td><b>Min Temperature:</b> {this.state.weatherData.mintemp}</td>
                       <td><b>Sunset:</b> {this.state.weatherData.sunrise}</td>
                   </tr>
                   <tr>
                       <td><b>Humadity: </b>{this.state.weatherData.humidity}</td>
                       <td><b>Wind Speed:</b> {this.state.weatherData.speed}</td>
                   </tr>
                   <tr>
                       <td><b>Pressure:</b> {this.state.weatherData.pressure}</td>
                       <td><b>Sky:</b> {this.state.weatherData.cloudy}</td>
                   </tr>
         </table>
     </div>
        }
        return (
            <div className="weather-app">
                <h2 className="app-header">WeatherApp</h2>
                <div className="input-editor">
            <select className="form-control city-name" value={this.state.selectClear} onChange={this.handleOptionChange}>
                <option value='1'>Temperature scale</option>
                <option value="units=imperial">Farenheit</option>
                <option value="units=metric">Celsius</option>
            </select>
                <input
                    placeholder="Enter your city..."
                    className="form-control city-name"
                    value={this.state.city}
                    onChange={this.handleTextChange}
                />
                <button className="btn btn-primary add-button" onClick={this.handleCityAdd}>Check weather</button>
                <br/>
                <div className="error" >{this.state.cityEror}</div>
                <br/>
                {info}
                <br/>
                <button className="more-info" onClick={this.showMoreInfo}>More info</button>
            </div>
            {extendInfo}
</div>
        );
    },

    
});

module.exports = WeatherApp;
