import test from 'ava';
import {
  parse,
  isSameDay,
  differenceInDays,
  differenceInWeeks,
  isMonday,
  isSunday,
} from 'date-fns';
import { dateRange } from '../helpers';

const isValidDaily = function isValidDaily(startDate, endDate, givenDate) {
  const start = parse(startDate);
  const end = parse(endDate);
  const given = parse(givenDate);
  return (isSameDay(start, given)) && (isSameDay(end, given));
};

const isValidWeekly = function isValidWeekly(startDate, endDate) {
  const start = parse(startDate);
  const end = parse(endDate);
  return (differenceInWeeks(start, end) === 0) &&
    (differenceInDays(start, end) === -6) &&
    (isMonday(start)) &&
    (isSunday(end));
};

const isValidMonthly = function isValidMonthly(startDate, endDate) {
  return (startDate === endDate);
};

test('date parsing - 2017/09/05', (t) => {
  const someDate = '2017/09/05';
  const dr = dateRange(someDate);

  const daily = dr.daily();
  t.true(isValidDaily(daily.start, daily.end, someDate));

  const weekly = dr.weekly();
  t.true(isValidWeekly(weekly.start, weekly.end));

  const monthly = dr.monthly();
  t.true(isValidMonthly(monthly.start, monthly.end));
});

test('date parsing - undefined', (t) => {
  const someDate = undefined;
  const dr = dateRange(someDate);

  const daily = dr.daily();
  t.true(isValidDaily(daily.start, daily.end, new Date()));

  const weekly = dr.weekly();
  t.true(isValidWeekly(weekly.start, weekly.end));

  const monthly = dr.monthly();
  t.true(isValidMonthly(monthly.start, monthly.end));
});

test('date parsing - null', (t) => {
  const someDate = null;
  const dr = dateRange(someDate);

  const daily = dr.daily();
  t.true(isValidDaily(daily.start, daily.end, new Date()));

  const weekly = dr.weekly();
  t.true(isValidWeekly(weekly.start, weekly.end));

  const monthly = dr.monthly();
  t.true(isValidMonthly(monthly.start, monthly.end));
});
