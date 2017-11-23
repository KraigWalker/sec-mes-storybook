 /**
 * @class DateUtils
 */

// const config = require('../config');
const moment = require('moment');

const DateUtils = {

	/**
	 * Converts timestamp to Date as per the API requirement format
	 * @param  {String} dateStr e.g. format - 'YYYY-MM-DD'
	 */
	getISODateString(dateStr) {
		return moment(dateStr).format("YYYY-MM-DD")
	},

	/**
	 * sort array by date ascending
	 * @param  {Array} arrayData
	 */
	sortArrayByDate(arrayData){
		return arrayData.sort((a, b) =>b.getDateCreated().split('/').reverse().join().localeCompare(a.getDateCreated().split('/').reverse().join())); 
	}

};

module.exports = DateUtils;
