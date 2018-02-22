import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './newtab/App';

// alert('Ovrride here');
// axios.get('https://www.rescuetime.com/anapi/data?key=B63vZzEJVBI4t6W1iSBzmm77zRdsMbwL2omNfPu6', {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   }
// })
//   .then(function (response) {
//     console.log(response);
//     res = response;
//   })
//   .catch(function (error) {
//     console.log('So there is an error?');
//     console.log(error);
//   });


ReactDOM.render(<App />, document.getElementById('app'));
