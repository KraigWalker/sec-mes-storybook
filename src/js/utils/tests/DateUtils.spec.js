import {
  getISODateString,
  sortArrayByDate,
  getFriendlyDateFromUnix,
  isUnixDate,
} from '../DateUtils';
import TestData from '../../content/secureMessagesTestData.json';

describe('Date Utils Check:', () => {
  it('getISODateString - Should return "DD-MM-YYYY" formmated date by taking ISO-8601 formatted date as parameter ', () => {
    expect(getISODateString('2017-10-17T10:56:43')).toHaveLength(10);
    expect(getISODateString('2017-10-17T10:56:43')).toBe('17-10-2017');
  });
  it('sortArrayByDate - Should return sorted array with most recent date', () => {
    let SortedArray = sortArrayByDate(TestData.secure_messages);
    expect(SortedArray[0].date_created).toEqual('2017-10-19T10:56:43.511Z');
    expect(SortedArray[1].date_created).toEqual('2017-10-17T10:56:43.511Z');
    expect(SortedArray[2].date_created).toEqual('2017-09-17T10:56:43.511Z');
    expect(SortedArray[3].date_created).toEqual('2017-09-17T10:56:43.511Z');
    expect(SortedArray[4].date_created).toEqual('2017-01-17T10:56:43.511Z');
  });

  it('getFriendlyDateFroUnix', () => {
    const unixDate = 1555407654000;
    const formattedDate = getFriendlyDateFromUnix(unixDate);
    expect(formattedDate).toEqual('16 Apr 2019 10:40');
  });

  it('isUnixdate - when is valid date return true', () => {
    const unixDate = 1555407654000;
    const result = isUnixDate(unixDate);
    expect(result).toBe(true);
  });

  it('isUnixdate - when is invalid unix date return false', () => {
    const unixDate = '2017-10-17T10:56:43';
    const result = isUnixDate(unixDate);
    expect(result).toBe(false);
  });
});
