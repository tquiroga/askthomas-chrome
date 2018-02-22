import React, { Component } from 'react';
import axios from 'axios';

import weatherIcons from './icons';
import settings from '../../../../settings.json';
import '../../../../css/weather-icons.min.css';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
    };
  }

  componentWillMount() {
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        'APPID': settings.keys.openWeatherMap,
        'q': settings.weather.city,
        'units': 'metric',
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      this.setState({ weather: response.data });
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }

  getWeatherIconClass(code) {
    var prefix = 'wi wi-';
    var icon = weatherIcons[code].icon;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }
    icon = prefix + icon;
    return icon;
  }

  render() {
    const { weather } = this.state;
    if (this.state.weather) {
      return (
        <div className="Weather fadeIn">
          <i className={this.getWeatherIconClass(weather.weather[0].id)} /> {Math.round(weather.main.temp)} C&deg; {weather.name}
        </div>
      );
    }
    
    return <div />;
  }
}