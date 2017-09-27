import test from 'ava';
import Melon from '..';

const options = {
  date: '04/20/2017',
  cutLine: 5,
};
const melon = Melon(options.date, options);

test('length ranks - realtime', t => melon.realtime().then((chart) => {
  t.is(chart.data.length, options.cutLine);
}));

test('length ranks - daily', t => melon.daily().then((chart) => {
  t.is(chart.data.length, options.cutLine);
}));

test('length ranks - weekly', t => melon.weekly().then((chart) => {
  t.is(chart.data.length, options.cutLine);
}));

test('length ranks - monthly', t => melon.monthly().then((chart) => {
  t.is(chart.data.length, options.cutLine);
}));

test('length JSON keys - realtime', t => melon.realtime().then((chart) => {
  t.is(Object.keys(chart.data[0]).length, 4);
}));

test('length JSON keys - daily', t => melon.daily().then((chart) => {
  t.is(Object.keys(chart.data[0]).length, 4);
}));

test('length JSON keys - weekly', t => melon.weekly().then((chart) => {
  t.is(Object.keys(chart.data[0]).length, 4);
}));

test('length JSON keys - monthly', t => melon.monthly().then((chart) => {
  t.is(Object.keys(chart.data[0]).length, 4);
}));

test('data keys exist - realtime', t => melon.realtime().then((chart) => {
  t.true(Object.keys(chart.data[0]).includes('rank'));
  t.true(Object.keys(chart.data[0]).includes('title'));
  t.true(Object.keys(chart.data[0]).includes('artist'));
  t.true(Object.keys(chart.data[0]).includes('album'));
}));

test('data keys exist - daily', t => melon.daily().then((chart) => {
  t.true(Object.keys(chart.data[0]).includes('rank'));
  t.true(Object.keys(chart.data[0]).includes('title'));
  t.true(Object.keys(chart.data[0]).includes('artist'));
  t.true(Object.keys(chart.data[0]).includes('album'));
}));

test('data keys exist - weekly', t => melon.weekly().then((chart) => {
  t.true(Object.keys(chart.data[0]).includes('rank'));
  t.true(Object.keys(chart.data[0]).includes('title'));
  t.true(Object.keys(chart.data[0]).includes('artist'));
  t.true(Object.keys(chart.data[0]).includes('album'));
}));

test('data keys exist - monthly', t => melon.monthly().then((chart) => {
  t.true(Object.keys(chart.data[0]).includes('rank'));
  t.true(Object.keys(chart.data[0]).includes('title'));
  t.true(Object.keys(chart.data[0]).includes('artist'));
  t.true(Object.keys(chart.data[0]).includes('album'));
}));

test('date keys exist - realtime', t => melon.realtime().then((chart) => {
  t.true(Object.keys(chart.dates).includes('start'));
  t.true(Object.keys(chart.dates).includes('end'));
}));

test('date keys exist - daily', t => melon.daily().then((chart) => {
  t.true(Object.keys(chart.dates).includes('start'));
  t.true(Object.keys(chart.dates).includes('end'));
}));

test('date keys exist - weekly', t => melon.weekly().then((chart) => {
  t.true(Object.keys(chart.dates).includes('start'));
  t.true(Object.keys(chart.dates).includes('end'));
}));

test('date keys exist - monthly', t => melon.monthly().then((chart) => {
  t.true(Object.keys(chart.dates).includes('start'));
  t.true(Object.keys(chart.dates).includes('end'));
}));
