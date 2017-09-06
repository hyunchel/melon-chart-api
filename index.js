const populateOptions = require('./defaults');

const {
  dateRange,
  extractChart,
  createMessageData,
  composeUrl,
  fetchHtmlText,
} = require('./helpers');

/**
* Melon class.
*/
function Melon(date, options) {
  const opts = populateOptions(options);
  const dateManager = dateRange(date);
  const { cutLine, xpath } = opts;
  // const { xpath } = opts;
  const scrapeMelon = function (url, dates) {
    return fetchHtmlText(url)
      .then((htmlText) => {
        const chartData = extractChart(htmlText, xpath);
        return createMessageData(chartData, cutLine, dates);
      });
  };
  return {
    daily() {
      // NOTE: Dates are not needed for daily chart
      //       as Melon Music Chart does not provide previous daily charts.
      //       Daily chart will always fetch today's chart.
      const dates = dateManager.daily();
      const period = 'day';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates);
    },
    weekly() {
      const dates = dateManager.weekly();
      const period = 'week';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates);
    },
    monthly() {
      const dates = dateManager.monthly();
      const period = 'month';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates);
    },
  };
}

module.exports = Melon;
