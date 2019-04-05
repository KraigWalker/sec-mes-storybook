import { getISODateString, sortArrayByDate } from '../DateUtils';
import TestData from '../../content/secureMessagesTestData.json'


describe('Date Utils Check:', () => {
  it('getISODateString - Should return "DD-MM-YYYY" formmated date by taking ISO-8601 formatted date as parameter ', () => {
    expect(getISODateString("2017-10-17T10:56:43")).toHaveLength(10);
    expect(getISODateString("2017-10-17T10:56:43")).toBe("17-10-2017");
  });
  it('sortArrayByDate - Should return sorted array with most recent date', () => {
    let SortedArray = sortArrayByDate(TestData.securemessages);
    expect(SortedArray[0].date_created).toEqual('2017-10-19T10:56:43.511Z');
    expect(SortedArray[1].date_created).toEqual('2017-10-17T10:56:43.511Z');
    expect(SortedArray[2].date_created).toEqual('2017-09-17T10:56:43.511Z');
    expect(SortedArray[3].date_created).toEqual('2017-09-17T10:56:43.511Z');
    expect(SortedArray[4].date_created).toEqual('2017-01-17T10:56:43.511Z');
  });
});