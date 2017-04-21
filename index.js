const fetch = require('node-fetch');
const cheerio = require('cheerio');
const startOfWeek = require('date-fns/start_of_week');
const endOfWeek = require('date-fns/end_of_week');
const subWeeks = require('date-fns/sub_weeks');
const isThisWeek = require('date-fns/is_this_week');
const formatDate = require('date-fns/format');
const parseDate = require('date-fns/parse');
const queryString = require('querystring');
const parse = require('url-parse');
const populateOptions = require('./defaults');

/**
 * Date parsing functions.
 */
const dateRange = (function(date) {
  const dateObj = parseDate(date);
  const format = 'YYYYMMDD';

  return {
    weekly: function() {
      const option = { weekStartsOn: 1 };
      const includedDate = (isThisWeek(dateObj, option)) ? subWeeks(dateObj, 1) : dateObj;

      const startDate = startOfWeek(includedDate, option);
      const endDate = endOfWeek(includedDate, option);

      return {
        'start': formatDate(startDate, format),
        'end': formatDate(endDate, format)
      };
    }
  }
});

/**
 * URL parsing functions.
 */
function composeUrl(parsed) {
  return 'http://' + parsed.hostname + parsed.pathname + '?' + parsed.query;
}

function mangleUrl(dates, options) {
  const startDate = dates.start.toString();
  const endDate = dates.end.toString();
  const isFirstDate = false;
  const isLastDate = false;
  const moved = 'Y';
  const index = options.cutLine > 50 ? 0 : 1;
  const parsed = parse(options.url);
  // querystring module parses with unwanted character '?'
  const query = parsed.query.slice(1);
  const decoded = queryString.parse(query);
  decoded[options.startDateKey] = startDate;
  decoded[options.endDateKey] = endDate;
  decoded[options.isFirstDateKey] = isFirstDate;
  decoded[options.isLastDateKey] = isLastDate;
  decoded[options.movedKey] = moved;
  decoded[options.indexKey] = index;
  const encoded = queryString.stringify(decoded);
  parsed.query = encoded;
  return composeUrl(parsed);
};

/**
 * HTML parsing functions.
 */
function extractChart(htmlText, xpath) {
    const $ = cheerio.load(htmlText);

    function trimText(i, el) {
      return $(this).text().trim();
    }

    const songTitles = $(xpath.songTitles).map(trimText).get();
    const artistNames = $(xpath.artistNames).map(trimText).get();
    const albumNames = $(xpath.albumNames).map(trimText).get();
    return songTitles.map(function(el, i) {
      return {
        'rank': (i + 1).toString(),
        'title': el,
        'artist': artistNames[i],
        'album': albumNames[i]
      }
    });
};

function fetchHtmlText(url) {
  return fetch(url).then(resp => resp.text());
};

function createMessageData(chartData, cutLine, dates) {
  return {
    data: chartData.slice(0, cutLine),
    dates: dates
  };
}

/**
 * Main.
 */
function weekly(date, options) {
  const opts = populateOptions(options);
  const dateManager = dateRange(opts.date);
  const cutLine = opts.cutLine
  const xpath = opts.xpath;
  const dates = dateManager.weekly();
  const url = mangleUrl(dates, opts);
  return fetchHtmlText(url)
    .then(function(htmlText) {
      const chartData = extractChart(htmlText, xpath);
      return createMessageData(chartData, cutLine, dates);
    });
}

module.exports = weekly;