const fetch = require('node-fetch');
const cheerio = require('cheerio');
const startOfWeek = require('date-fns/start_of_week');
const endOfWeek = require('date-fns/end_of_week');
const subWeeks = require('date-fns/sub_weeks');
const isThisWeek = require('date-fns/is_this_week');
const isThisMonth = require('date-fns/is_this_month');
const isFuture = require('date-fns/is_future');
const subMonths = require('date-fns/sub_months');
const formatDate = require('date-fns/format');
const parseDate = require('date-fns/parse');
const queryString = require('querystring');
const parse = require('url-parse');
const populateOptions = require('./defaults');
const {
  dateRange,
  extractChart,
  createMessageData,
  composeUrl,
  fetchHtmlText
} = require('./helpers');

/**
 * Melon class.
 */
function Melon(date, options) {
  const opts = populateOptions(options);
  const dateManager = dateRange(date);
  const cutLine = opts.cutLine;
  const xpath = opts.xpath;
  const scrapeMelon = function(url, dates) {
    return fetchHtmlText(url)
      .then(function(htmlText) {
        const chartData = extractChart(htmlText, xpath);
        return createMessageData(chartData, cutLine, dates);
      });
  };
  return {
    daily: function() {
      // NOTE: Dates are not needed for daily chart
      //       as Melon Music Chart does not provide previous daily charts.
      //       Daily chart will always fetch today's chart.
      const dates = dateManager.daily();
      const period = 'day';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates);
    },
    weekly: function() {
      const dates = dateManager.weekly();
      const period = 'week';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates);
    },
    monthly: function() {
      const dates = dateManager.monthly();
      const period = 'month';
      const url = composeUrl(period, dates, opts);
      return scrapeMelon(url, dates);
    }
  }
};

module.exports = Melon;