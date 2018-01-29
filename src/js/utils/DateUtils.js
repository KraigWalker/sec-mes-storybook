 /**
 * @class DateUtils
 */
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
		// return arrayData.sort((a, b) =>b.getDateCreated().split('/').reverse().join().localeCompare(a.getDateCreated().split('/').reverse().join())); 
		return arrayData.sort(function compare(a, b) {
				return new Date(a.date_created) - new Date(b.date_created);
		}).reverse();
	};

		
	

