import test from 'ava';
import weekly from '..';

test.beforeEach(t => {
  const options = {
    date: '04/20/2017',
    cutLine: 5
  };
  t.context.options = options;
  t.context.weekly = weekly(options.date, options);
});

test('length ranks', t => {
  return t.context.weekly.then(chart => {
    t.is(chart.data.length, t.context.options.cutLine);
  });
})

test('length JSON keys', t => {
  return t.context.weekly.then(chart => {
    t.is(Object.keys(chart.data[0]).length, 4);
  });
});

test('data keys exist', t => {
  return t.context.weekly.then(chart => {
    t.true(Object.keys(chart.data[0]).includes('rank'));
    t.true(Object.keys(chart.data[0]).includes('title'));
    t.true(Object.keys(chart.data[0]).includes('artist'));
    t.true(Object.keys(chart.data[0]).includes('album'));
  });
});

test('date keys exist', t => {
  return t.context.weekly.then(chart => {
    t.true(Object.keys(chart.dates).includes('start'));
    t.true(Object.keys(chart.dates).includes('end'));
  });
});