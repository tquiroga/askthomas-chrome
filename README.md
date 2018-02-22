# Chrome Extension Webpack Boilerplate

A chrome extension to connect your RescueTime data and set your own targets.

![alt screenshot](https://raw.githubusercontent.com/tquiroga/askthomas-chrome/master/screenshot.png)

## Features

- Weather
- RescueTime and personal target integration
- Cool Programming quotes
- Cryptocurrencies price and 24h trend

## Setup

1. Clone the repository.
2. Install npm packages `npm i`
3. Rename `src/settings-example.json` to `src/settings.json`
4. Add your own settings in `src/settings.json` (see below for details)
5. Start webpack `npm start`
6. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun. To build prod package: `npm run build`

## Settings

Set the values in `src/settings.json`:
- `firstname`: Your firstname.
- `work.start`: The time you start working, make sure it's a 24h hour format `XX:XX`
- `work.end`: The time you start working, make sure it's a 24h hour format `XX:XX`
- `target.hours`: The number of hours you want to work in a day (number, e.g: 8)
- `target.minutes`: If more than plain hours (e.g: 30 -> for 8 hours and 30 minutes)
- `target.pulse`: The productivity pulse you target for the day (Number between 1-100)
- `weather.city`: Your city and country code (e.g: Paris,fr - London,uk, - Madrid,es)
- `bottomWidget`: Choose between widget you want at the bottom of the screen, options are: `crypto` or `quote`
- `coins`: Coins you want to see listed. Use [the `id`](https://api.coinmarketcap.com/v1/ticker/) of the coins.
- `keys`: API keys, see below

## APIs

- RescueTime: You can get API keys for RescueTime in the settings of your account (free).
- OpenWeatherMap: Sign up and create a key (free).

## Todos

- Add more integrations: weekly/monthly goals (Trello?)
