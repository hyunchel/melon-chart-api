const populateOptions = require('./defaults');

const {
  dateRange,
  scrapeMelon,
  composeUrl,
} = require('./helpers');

/**
* Melon class.
*/
function Melon(date, options) {
  const opts = populateOptions(options);
  const dateManager = dateRange(date);
  return {
    realtime() {
      const dates = dateManager.realtime();
      const period = 'realtime';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates, opts);
    },
    daily() {
      // NOTE: Dates are not needed for daily chart
      //       as Melon Music Chart does not provide previous daily charts.
      //       Daily chart will always fetch today's chart.
      const dates = dateManager.daily();
      const period = 'day';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates, opts);
    },
    weekly() {
      const dates = dateManager.weekly();
      const period = 'week';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates, opts);
    },
    monthly() {
      const dates = dateManager.monthly();
      const period = 'month';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates, opts);
    },
  };
}

module.exports = Melon;
