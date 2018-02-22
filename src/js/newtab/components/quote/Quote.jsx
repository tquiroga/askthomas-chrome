import React, { Component } from 'react';
import axios from 'axios';

import './Quote.scss';

export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
    };
  }

  componentWillMount() {
    axios.get('http://quotes.stormconsultancy.co.uk/random.json', {
      params: {},
    }).then(function (res) {
      this.setState({ quote: res.data });
    }.bind(this)).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { quote } = this.state;
    if (this.state.quote) {
      return (
        <div className="Quote container fadeIn">
          <div className="columns">
            <div className="column col-6 col-mx-auto">
              <blockquote>
                <p>{quote.quote}</p>
                <cite>- {quote.author}</cite>
              </blockquote>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}