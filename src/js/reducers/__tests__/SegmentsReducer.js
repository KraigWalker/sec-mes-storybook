import SegmentsReducer from '../SegmentsReducer';

describe('>>>R E D U C E R --- Test SegmentsReducer', () => {
  it('should return the initial state', () => {
    expect(SegmentsReducer(undefined, {})).toEqual({ segmentData: [], fetching: false, fetched: false });
  });
  it('+++ reducer for REQUEST_SEGMENTS', () => {
    let state = { segmentData: [], fetching: false, fetched: false };
    state = SegmentsReducer(state, { type: 'REQUEST_SEGMENT_DATA' });
    expect(state).toEqual({ segmentData: [], fetching: true, fetched: false });
  });
  it('+++ reducer for REQUEST_SEGMENTS_SUCCESS', () => {
    let state = { segmentData: [], fetched: false, fetching: false };
    state = SegmentsReducer(state, {
      type: 'REQUEST_SEGMENTS_SUCCESS',
      payload: {
        addresses: [],
        customers: [{ customer_id: '8464f748-4122-4b1c-8fec-5291002d1a78', role: 'OWNER' }],
        email_addresses: [{ value: 'VTKX0@CYBG.COM', preferred: true }],
        id: '3059275271',
        name: { title: 'Mr', first_name: 'Test Forename', middle_name: 'Test Middlename', last_name: 'Test Surname' },
        phone_numbers: [{ type: 'M', phone_number: '07459208094', preferred: true }],
        segment: 'P',
        sub_segment: 'E',
        tandcs: [{}],
      },
    });
    expect(state).toEqual({
      segmentData: {
        addresses: [],
        customers: [{ customer_id: '8464f748-4122-4b1c-8fec-5291002d1a78', role: 'OWNER' }],
        email_addresses: [{ value: 'VTKX0@CYBG.COM', preferred: true }],
        id: '3059275271',
        name: { title: 'Mr', first_name: 'Test Forename', middle_name: 'Test Middlename', last_name: 'Test Surname' },
        phone_numbers: [{ type: 'M', phone_number: '07459208094', preferred: true }],
        segment: 'P',
        sub_segment: 'E',
        tandcs: [{}],
      },
      fetched: true,
      fetching: false,
    });
  });
  it('+++ reducer for default case', () => {
    let state = { segmentData: [], fetching: false, fetched: false };
    state = SegmentsReducer(state, { type: '' });
    expect(state).toEqual({ segmentData: [], fetching: false, fetched: false });
  });
});
