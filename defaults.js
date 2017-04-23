/**
 * Default constants.
 */
const START_DATE_KEY = 'startDay';
const END_DATE_KEY = 'endDay';
const RANK_MONTH_KEY = 'rankMonth';
const IS_FIRST_DATE_KEY = 'isFirstDate';
const IS_LAST_DATE_KEY = 'isLastDate';
const MOVED_KEY = 'moved';
const INDEX_KEY = 'idx';
const URL = 'http://www.melon.com/chart/day/index.htm?';
const CUTLINE = 5;
const XPATH = {
  songTitles: '.wrap_song_info .rank01 span',
  artistNames: '.wrap_song_info .rank02 span',
  albumNames: '.wrap_song_info .rank03 a'
};
const MESSAGE_FN = function() { console.log('no messageFn is provied') };

function populateOptions(options) {
  return {
    startDateKey: options.startDateKey || START_DATE_KEY,
    endDateKey: options.endDateKey || END_DATE_KEY,
    rankMonthKey: options.rankMonthKey || RANK_MONTH_KEY,
    isFirstDateKey: options.isFirstDateKey || IS_FIRST_DATE_KEY,
    isLastDateKey: options.isLastDateKey || IS_LAST_DATE_KEY,
    movedKey: options.movedKey || MOVED_KEY,
    indexKey: options.indexKey || INDEX_KEY,
    url: options.url || URL,
    cutLine: options.cutLine || CUTLINE,
    xpath: options.xpath || XPATH,
    messageFn: options.messageFn || MESSAGE_FN,
    date: options.date || new Date()
  };
}

/*
  3 different options:

  Daily: { moved: Y, index: 0|1 }
  Weekly: { moved: Y, index: 0|1, startDay: date, endDay: date, isFirstDate: true|false, isLastDate: true|fasle }
  Monthly: { moved: Y, index: 0|1, rankMonth: 2017/03, isFirstDate: true|false, isLastDate: true|false }

  * There is no option to get daily of another day.
  * For "monthly", `isLastDate` will be alwasy set to true.

  * The entire part of URL should have not been a default b/c it is NOT a constant?

*/

module.exports = populateOptions;