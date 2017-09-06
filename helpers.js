const queryString = require('querystring');
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
const parse = require('url-parse');

/**
* Date parsing functions.
*/
const dateRange = (function (date) {
  const dateObj = parseDate(date);
  const format = 'YYYYMMDD';

  return {
    daily() {
      let startDate = dateObj;
      let endDate = dateObj;
      if (isFuture(dateObj)) {
        startDate = new Date();
        endDate = new Date();
      }
      return {
        start: formatDate(startDate, format),
        end: formatDate(endDate, format),
      };
    },
    weekly() {
      const option = { weekStartsOn: 1 };
      const includedDate = (isThisWeek(dateObj, option)) ? subWeeks(dateObj, 1) : dateObj;

      const startDate = startOfWeek(includedDate, option);
      const endDate = endOfWeek(includedDate, option);

      return {
        start: formatDate(startDate, format),
        end: formatDate(endDate, format),
      };
    },
    monthly() {
      const monthFormat = 'YYYYMM';
      let startDate = dateObj;
      let endDate = dateObj;
      if (isThisMonth(dateObj) || isFuture(dateObj)) {
        const lastMonth = subMonths(new Date(), 1);
        startDate = lastMonth;
        endDate = lastMonth;
      }
      return {
        start: formatDate(startDate, monthFormat),
        end: formatDate(endDate, monthFormat),
      };
    },
  };
});

/**
* URL parsing functions.
*/
function makeUrlString(parsed) {
  return `http://${parsed.hostname}${parsed.pathname}?${parsed.query}`;
}

function composeUrl(period, dates, options) {
  // Base attributes which all charts need.
  let { url } = options;
  const decoded = {};
  decoded[options.indexKey] = options.cutLine > 50 ? 0 : 1;
  decoded[options.movedKey] = 'Y';
  if (period === 'week') {
    url = options.url.replace('day', 'week');
    decoded[options.startDateKey] = dates.start.toString();
    decoded[options.endDateKey] = dates.end.toString();
    decoded[options.isFirstDateKey] = false;
    decoded[options.isLastDateKey] = false;
  }
  if (period === 'month') {
    url = options.url.replace('day', 'month');
    decoded[options.rankMonthKey] = dates.start.toString();
  }
  const parsed = parse(url);
  const encoded = queryString.stringify(decoded);
  parsed.query = encoded;
  return makeUrlString(parsed);
}

/**
* HTML parsing functions.
*/
function extractChart(htmlText, xpath) {
  const $ = cheerio.load(htmlText);

  function trimText() {
    return $(this).text().trim();
  }

  const songTitles = $(xpath.songTitles).map(trimText).get();
  const artistNames = $(xpath.artistNames).map(trimText).get();
  const albumNames = $(xpath.albumNames).map(trimText).get();
  return songTitles.map((el, i) => ({
    rank: (i + 1).toString(),
    title: el,
    artist: artistNames[i],
    album: albumNames[i],
  }));
}

function fetchHtmlText(url) {
  return fetch(url).then(resp => resp.text());
}

function createMessageData(chartData, cutLine, dates) {
  return {
    data: chartData.slice(0, cutLine),
    dates,
  };
}

module.exports = {
  dateRange,
  extractChart,
  createMessageData,
  composeUrl,
  fetchHtmlText,
};
