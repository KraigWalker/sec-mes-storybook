 /**
 * @class DateUtils
 */
import _ from  'lodash';
import moment from 'moment';


	/**
	 * Converts timestamp to Date as per the API requirement format
	 * @param  {String} dateStr e.g. format - 'YYYY-MM-DD'
	 */
	export function getISODateString(dateStr) {
		return moment(dateStr).format("DD-MM-YYYY")
	};

	/**
	 * sort array by date ascending
	 * @param  {Array} arrayData
	 */
	export function sortArrayByDate(arrayData){
		return _.sortBy(arrayData, ['date_created']).reverse();
	};

		
	

