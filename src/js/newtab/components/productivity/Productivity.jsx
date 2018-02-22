import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import pluralize from 'pluralize';
import CircularProgressbar from 'react-circular-progressbar';

import settings from '../../../../settings.json';
import './Productivity.scss';

class Productivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  componentWillMount() {
    axios.get('https://www.rescuetime.com/anapi/data', {
      params: {
        key: settings.keys.rescueTime,
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
      this.setState({ rows: response.data.rows });
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }

  getTotalTime() {
    const totalSeconds = _.sumBy(this.state.rows, row => row[1]);
    const totalMinutes = (totalSeconds / 60).toFixed();
    return {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
    }
  }

  getWorkPercentage() {
    const target = (settings.target.hours * 3600) + (settings.target.minutes * 60);
    const totalSeconds = _.sumBy(this.state.rows, row => row[1]);
    return ((totalSeconds / target) * 100).toFixed();
  }

  getProductivityPulse() {
    const total = _.sumBy(this.state.rows, row => row[1]);
    const vd = _.sumBy(this.state.rows, row => row[5] === -2 ? row[1] : 0);
    const d = _.sumBy(this.state.rows, row => row[5] === -1 ? row[1] : 0);
    const n = _.sumBy(this.state.rows, row => row[5] === 0 ? row[1] : 0);
    const p = _.sumBy(this.state.rows, row => row[5] === 1 ? row[1] : 0);
    const vp = _.sumBy(this.state.rows, row => row[5] === 2 ? row[1] : 0);

    return (((vd * 0) + (d * 1) + (n * 2) + (p * 3) + (vp * 4)) / (total * 4)) * 100;
  }

  getDayProgress() {
    const startTime = settings.work.start.split(':');
    const endTime = settings.work.end.split(':');
    const todayMorning = moment().hour(startTime[0]).minutes(startTime[1]).seconds(0);
    const todayMidnight = moment().hour(endTime[0]).minutes(endTime[1]).seconds(59);
    const worked = moment().diff(todayMorning, 'seconds');
    const total = todayMidnight.diff(todayMorning, 'seconds');
    return Math.floor((worked / total) * 100);
  }

  render() {
    const total = this.getTotalTime();
    const dayProgress = this.getDayProgress();
    const workProgress = this.getWorkPercentage();
    const pulse = this.getProductivityPulse();
    const greeting = this.props.greeting;

    if (settings.keys.rescueTime === "") {
      return <p className="text-center">Set your RescueTime API key in settings.json and your daily target</p>;
    }

    if (this.state.rows.length > 0) {
      return (
        <div className="Productivity fadeIn">
          <p>
            You have worked <strong>{pluralize('hour', total.hours, true)} and {pluralize('minute', total.minutes, true)}</strong><br />
            <br />
          </p>
          <div className="columns">
            <div className="column col-4 col-mx-auto">
              <div className="columns">
                <div className="column">
                  <div className="radial float-right">
                    <h6><i className={`fal ${greeting === 'evening' ? 'fa-moon' : 'fa-sun'} yellow-sun`} /> Day</h6>
                    <CircularProgressbar
                      initialAnimation
                      percentage={dayProgress}
                      className={`progressbar-${greeting}`}
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="radial centered">
                    <h6><i className="fal fa-clock" /> Work</h6>
                    <CircularProgressbar
                      initialAnimation
                      percentage={workProgress}
                      className={workProgress < dayProgress ? 'progressbar-red' : 'progressbar-green'}
                    />
                  </div>
                </div>
                <div className="column text-center">
                  <div className="radial float-left">
                    <h6><i className="fas fa-heartbeat red-beat" /> Pulse</h6>
                    <CircularProgressbar
                      initialAnimation
                      percentage={Math.floor(pulse)}
                      textForPercentage={(pct) => `${pct}`}
                      className={Math.floor(pulse) < 88 ? 'progressbar-red' : 'progressbar-green'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default Productivity;
