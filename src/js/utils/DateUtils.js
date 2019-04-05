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

	/**
	 * Converts timestamp to moment date 
	 * @param  {String} dateStr e.g. format - 'DD MMM YYYY hh:mm'
	 */
	export function getFriendlyDate(dateStr){
		return moment(dateStr,  "YYYY-MM-DDTHH:mm").format("DD MMM YYYY HH:mm");
	};
		
	

