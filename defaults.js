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
  songTitles: '.wrap_song_info .rank01 span a',
  artistNames: '.wrap_song_info .rank02 span',
  albumNames: '.wrap_song_info .rank03 a',
};
const MESSAGE_FN = function MESSAGE_FN() {
  console.log('no messageFn is provied');
};

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
    date: options.date || new Date(),
  };
}

module.exports = populateOptions;
