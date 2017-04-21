/**
 * Default constants.
 */
const START_DATE_KEY = 'startDay';
const END_DATE_KEY = 'endDay';
const IS_FIRST_DATE_KEY = 'isFirstDate';
const IS_LAST_DATE_KEY = 'isLastDate';
const MOVED_KEY = 'moved';
const INDEX_KEY = 'idx';
const URL = 'http://www.melon.com/chart/week/index.htm?idx=1&startDay=20170227&endDay=20170305&isFirstDate=false&isLastDate=false&moved=Y';
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

module.exports = populateOptions;