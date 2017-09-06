# Melon Chart API

[![Build Status](https://travis-ci.org/hyunchel/melon-chart-api.svg?branch=master)](https://travis-ci.org/hyunchel/melon-chart-api)

Scrapes Melon Music chart data from Melon Music website.

## Install

```bash
$ npm install --save melon-chart-api
```

## Usage

```js
const Melon = require('melon-chart-api');
Melon('04/24/2017', { cutLine: 5 }).daily().then(chartData => {
  console.log(chartData);
})
```

As of `04/24/2017`, the code above results in the following:

```
{
    "data": [
        {
            "rank": "1",
            "title": "팔레트 (Feat. G-DRAGON)",
            "artist": "아이유",
            "album": "Palette"
        },
        {
            "rank": "2",
            "title": "사랑이 잘 (With 오혁)",
            "artist": "아이유",
            "album": "사랑이 잘"
        },
        {
            "rank": "3",
            "title": "이런 엔딩",
            "artist": "아이유",
            "album": "Palette"
        },
        {
            "rank": "4",
            "title": "이 지금",
            "artist": "아이유",
            "album": "Palette"
        },
        {
            "rank": "5",
            "title": "잼잼",
            "artist": "아이유",
            "album": "Palette"
        }
    ],
    "dates": {
        "start": "20170424",
        "end": "20170424"
    }
}
```
> feat. 갓이유

## API

### Melon(date, [options])

#### date

Type: `number`, `string`, `object`

Any object that can be parsed using `date-fns/parse` function.

#### options

##### cutLine

Type: `number`

Default: `5`

### methods

All methods return a promise that results to Melon chart rankings in JSON.

#### Melon.daily()

Returns daily chart.
This method will ignore the given date, as Melon Music does not provide previous daily charts.
Regardless of the date, this method will always return the most recent daily chart.

#### Melon.weekly()

Returns weekly chart for the given date.
The coresponding week will be computed and fetch the correct chart accordingly.

#### Melon.monthly()

Returns monthly chart for the given date.

