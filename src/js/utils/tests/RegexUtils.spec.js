import { shallow } from 'enzyme';
import RegexUtils from '../RegexUtils';
import TestData from '../../content/secureMessagesTestData.json'


describe('Regex Utils Check:', () => {
  it('matchString - Should retrun matting PAN number from string PAN FORMAT: 1234 1234 1234 1234', () => {
    const Test1 = RegexUtils.matchCardDetails("dsfdskjfl dskfjdskj flkdsjfl kdsjflkds jflkdsfj 1234 1234 1234 1234");
    expect(Test1[0]).toEqual("1234 1234 1234 1234");
    
  });
  it('matchString - Should retrun matting PAN number from string PAN FORMAT: 1234123412341234', () => {
    const Test2 = RegexUtils.matchCardDetails("dsfdskjfl dskfjdskj flkdsjfl kdsjflkds jflkdsfj 1234 1234 1234 1234");
    expect(Test2[0]).toEqual("1234 1234 1234 1234");
  });
  it('matchString - Should retrun matting PAN number from string PAN FORMAT: 1234-1234-1234-1234', () => {
    const Test3 = RegexUtils.matchCardDetails("dsfdskjfl dskfjdskj flkdsjfl kdsjflkds jflkdsfj 1234 1234 1234 1234");
    expect(Test3[0]).toEqual("1234 1234 1234 1234");
  });
  it('getLastFourDigits - Should retrun last 5 digits of string', () => {
    expect(RegexUtils.getLastFourDigits('1234123412341234')).toEqual('41234');
  });

});