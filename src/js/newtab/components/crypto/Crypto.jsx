import React, { Component } from 'react';
import axios from 'axios';

import settings from '../../../../settings.json';
import './Crypto.scss';

export default class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: [],
    };
  }

  componentWillMount() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/', {
      params: {
        limit: 100,
      },
    }).then(function (res) {
      this.setState({ cryptos: res.data });
    }.bind(this)).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const coins = settings.coins;
    const cryptos = _.filter(this.state.cryptos, c => coins.indexOf(c.id) !== -1);
    if (cryptos.length > 0) {
      return (
        <div className="Crypto container fadeIn">
          <div className="columns">
            <div className="column col-6 col-mx-auto">
              <ul>
                {cryptos.map(c => {
                  const cryptoPrice = parseFloat(c.price_usd);
                  return (
                    <li key={c.symbol}>
                      <span>{c.symbol}</span> &nbsp; 
                      $ {cryptoPrice > 10 ? cryptoPrice.toFixed(2) : cryptoPrice.toFixed(4)} &nbsp;
                      {c.percent_change_24h < 0 ? <i className="fas fa-sort-down down-red" /> : <i className="fas fa-sort-up up-green" />}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}