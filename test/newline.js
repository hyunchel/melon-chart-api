import test from 'ava';
import Melon from '..';
import JSON_WEEK_OF_2017_06_06 from './week_of_2017_06_06.json';
import JSON_MONTH_OF_2017_06_06 from './month_of_2017_06_06.json';

const options = {
  date: '2017/06/06',
  cutLine: 50,
};
const melon = Melon(options.date, options);

// NOTE: Dates are not needed for daily chart
//       as Melon Music Chart does not provide previous daily charts.
//       Daily chart will always fetch today's chart.
test('content - daily', t => melon.daily().then((chart) => {
  t.notDeepEqual(chart, JSON_WEEK_OF_2017_06_06);
}));

test('content - weekly', t => melon.weekly().then((chart) => {
  t.deepEqual(chart, JSON_WEEK_OF_2017_06_06);
}));

test('content - monthly', t => melon.monthly().then((chart) => {
  t.deepEqual(chart, JSON_MONTH_OF_2017_06_06);
}));
