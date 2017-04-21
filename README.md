# Melon Chart API

Scrapes Melon Music chart data from Melon Music website.

## Install

```bash
$ npm install --save melon-chart-api
```

## Usage

```js
const weekly from 'melon-chart-api';

weekly('04/20/2017', { cutLine: 5 }).then(chartData => {
  console.log(chartData);
})
```

As of `04/20/2017`, the code above results in the following:

```
{ data:
   [ { rank: '1',
       title: '사랑이 잘 (With 오혁)',
       artist: '아이유',
       album: '사랑이 잘' },
     { rank: '2', title: '밤편지', artist: '아이유', album: '밤편지' },
     { rank: '3',
       title: 'REALLY REALLY',
       artist: 'WINNER',
       album: 'FATE NUMBER FOR' },
     { rank: '4',
       title: 'Marry Me',
       artist: '마크툽 (MAKTUB), 구윤회',
       album: '마크툽 프로젝트 Vol.03' },
     { rank: '5',
       title: '얼굴 찌푸리지 말아요',
       artist: '하이라이트 (Highlight)',
       album: 'CAN YOU FEEL IT?' } ],
  dates: { start: '20170410', end: '20170416' } }
```
> feat. 갓이유

## API

### weekly(date, [options])

Returns a promise.

#### date

Type: `number`, `string`, `object`

Any object that can be parsed using `date-fns/parse` function.

#### options

##### cutLine

Type: `number`

Default: `5`