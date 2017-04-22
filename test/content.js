import test from 'ava';
import weekly from '..';
import JSON_2016_12_25 from './data';

test.beforeEach(t => {
  const options = {
    date: '2016/12/25',
    cutLine: 10
  };
  t.context.options = options;
  t.context.weekly = weekly(options.date, options);
});

test('content', t => {
  return t.context.weekly.then(chart => {
    t.deepEqual(chart, JSON_2016_12_25);
  });
});