/**
 * @class DateUtils
 */
import { sortBy } from 'lodash-es';
import moment from 'moment';

const friendlyDateFormat = 'DD MMM YYYY HH:mm';

/**
 * Converts timestamp to Date as per the API requirement format
 * @param  {String} dateStr e.g. format - 'YYYY-MM-DD'
 */
export function getISODateString(dateStr) {
  return moment(dateStr).format('DD-MM-YYYY');
}

/**
 * sort array by date ascending
 * @param  {Array} arrayData
 */
export function sortArrayByDate(arrayData) {
  return sortBy(arrayData, ['date_created']).reverse();
}

/**
 * Converts timestamp to moment date
 * @param  {String} dateStr e.g. format - 'DD MMM YYYY hh:mm'
 */
export function getFriendlyDate(dateStr) {
  return moment(dateStr, 'YYYY-MM-DDTHH:mm').format(friendlyDateFormat);
}

export function isUnixDate(date) {
  return moment.unix(date).isValid();
}

/**
 * Converts unix epoch date to string format
 * @param  {String} dateStr e.g. format - 'DD MMM YYYY hh:mm'
 */
export function getFriendlyDateFromUnix(date) {
  return moment(date).utc(true).format(friendlyDateFormat);
}
