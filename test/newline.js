import test from 'ava';
import Melon from '..';
import JSON_WEEK_OF_2017_06_06 from './week_of_2017_06_06';
import JSON_MONTH_OF_2017_06_06 from './month_of_2017_06_06';

test.beforeEach(t => {
  const options = {
    date: '2017/06/06',
    cutLine: 50
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
    t.notDeepEqual(chart, JSON_WEEK_OF_2017_06_06);
  });
});

test('content - weekly', t => {
  return t.context.weekly.then(chart => {
    t.deepEqual(chart, JSON_WEEK_OF_2017_06_06);
  });
});

test('content - monthly', t => {
  return t.context.monthly.then(chart => {
    t.deepEqual(chart, JSON_MONTH_OF_2017_06_06);
  });
});
