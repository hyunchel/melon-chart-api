import test from 'ava';
import Melon from '..';
import JSON_WEEK_OF_2016_12_25 from './week_of_2016_12_25';
import JSON_MONTH_OF_2016_12_25 from './month_of_2016_12_25';

test.beforeEach(t => {
  const options = {
    date: '2016/12/25',
    cutLine: 10
  };
  const melon = Melon(options.date, options);
  t.context.options = options;
  t.context.daily = melon.daily();
  t.context.weekly = melon.weekly();
  t.context.monthly = melon.monthly();
});

test('content - daily', t => {
  // NOTE: Dates are not needed for daily chart
  //       as Melon Music Chart does not provide previous daily charts.
  //       Daily chart will always fetch today's chart.
  return t.context.daily.then(chart => {
    t.notDeepEqual(chart, JSON_WEEK_OF_2016_12_25);
  });
});

test('content - weekly', t => {
  return t.context.weekly.then(chart => {
    t.deepEqual(chart, JSON_WEEK_OF_2016_12_25);
  });
});

test('content - monthly', t => {
  return t.context.monthly.then(chart => {
    t.deepEqual(chart, JSON_MONTH_OF_2016_12_25);
  });
});