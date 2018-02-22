import React, { Component } from 'react';
import moment from 'moment';

import { Productivity, Quote, Weather, Crypto } from './components';
import { getGreetingTime } from './helpers';
import settings from '../../settings.json';
import '../vendors/fontawesome-all.min.js';
import './App.scss';

const App = () => {
  const greeting = getGreetingTime(moment());
  return (
    <div>
      <div id="topbar">
        <div className="weather">
          <Weather />
        </div>
        <div className="calendar">
          <i className="fal fa-calendar-alt" /> {moment().format('dddd Do	MMMM')}
        </div>
      </div>
      <div id="numbers" className="container">
        <h1>Good {greeting} {settings.firstname}</h1>
        <Productivity greeting={greeting} />
        {settings.bottomWidget === 'crypto' ? <Crypto /> : <Quote />}
      </div>
    </div>
  );
}

export default App;
