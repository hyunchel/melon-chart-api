import test from 'ava';
import Melon from '..';

test.beforeEach(t => {
  const options = {
    date: '04/20/2017',
    cutLine: 5
  };
  const melon = Melon(options.date, options);
  t.context.options = options;
  t.context.daily = melon.daily();
  t.context.weekly = melon.weekly();
  t.context.monthly = melon.monthly();
});

test('length ranks - daily', t => {
  return t.context.daily.then(chart => {
    t.is(chart.data.length, t.context.options.cutLine);
  });
})

test('length ranks - weekly', t => {
  return t.context.weekly.then(chart => {
    t.is(chart.data.length, t.context.options.cutLine);
  });
})

test('length ranks - monthly', t => {
  return t.context.monthly.then(chart => {
    t.is(chart.data.length, t.context.options.cutLine);
  });
})

test('length JSON keys - daily', t => {
  return t.context.daily.then(chart => {
    t.is(Object.keys(chart.data[0]).length, 4);
  });
});

test('length JSON keys - weekly', t => {
  return t.context.weekly.then(chart => {
    t.is(Object.keys(chart.data[0]).length, 4);
  });
});

test('length JSON keys - monthly', t => {
  return t.context.monthly.then(chart => {
    t.is(Object.keys(chart.data[0]).length, 4);
  });
});

test('data keys exist - daily', t => {
  return t.context.daily.then(chart => {
    t.true(Object.keys(chart.data[0]).includes('rank'));
    t.true(Object.keys(chart.data[0]).includes('title'));
    t.true(Object.keys(chart.data[0]).includes('artist'));
    t.true(Object.keys(chart.data[0]).includes('album'));
  });
});

test('data keys exist - weekly', t => {
  return t.context.weekly.then(chart => {
    t.true(Object.keys(chart.data[0]).includes('rank'));
    t.true(Object.keys(chart.data[0]).includes('title'));
    t.true(Object.keys(chart.data[0]).includes('artist'));
    t.true(Object.keys(chart.data[0]).includes('album'));
  });
});

test('data keys exist - monthly', t => {
  return t.context.monthly.then(chart => {
    t.true(Object.keys(chart.data[0]).includes('rank'));
    t.true(Object.keys(chart.data[0]).includes('title'));
    t.true(Object.keys(chart.data[0]).includes('artist'));
    t.true(Object.keys(chart.data[0]).includes('album'));
  });
});

test('date keys exist - daily', t => {
  return t.context.daily.then(chart => {
    t.true(Object.keys(chart.dates).includes('start'));
    t.true(Object.keys(chart.dates).includes('end'));
  });
});

test('date keys exist - weekly', t => {
  return t.context.weekly.then(chart => {
    t.true(Object.keys(chart.dates).includes('start'));
    t.true(Object.keys(chart.dates).includes('end'));
  });
});

test('date keys exist - monthly', t => {
  return t.context.monthly.then(chart => {
    t.true(Object.keys(chart.dates).includes('start'));
    t.true(Object.keys(chart.dates).includes('end'));
  });
});