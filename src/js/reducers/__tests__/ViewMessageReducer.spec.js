import ViewMessageReducer from '../ViewMessageReducer';
import {
  NO_MODAL,
  DELETE_MODAL,
  ARCHIVE_MODAL,
  UNARCHIVE_MODAL,
} from '../../constants/ModalConstants';

describe('>>>R E D U C E R --- Test ViewMessageReducer', () => {
  it('should return the initial state', () => {
    expect(ViewMessageReducer(undefined, {})).toEqual({
      messageDetail: {},
      modalType: NO_MODAL,
    });
  });
  it('+++ reducer for SET_VIEW_MESSAGE_DETAIL', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, {
      type: 'SET_VIEW_MESSAGE_DETAIL',
      payload: {
        account: {
          accountId: undefined,
          name: null,
          number: undefined,
        },
        dateCreated: '20-04-2018',
        id: 'CB20001417',
        message: 'abc',
        reference: 'CB20001417',
        status: 'NEW',
        subject: 'General Feedback',
        threadID: null,
      },
    });
    expect(state).toEqual({
      messageDetail: {
        account: {
          accountId: undefined,
          name: null,
          number: undefined,
        },
        dateCreated: '20-04-2018',
        id: 'CB20001417',
        message: 'abc',
        reference: 'CB20001417',
        status: 'NEW',
        subject: 'General Feedback',
        threadID: null,
      },
      modalType: NO_MODAL,
    });
  });
  it('+++ reducer for GET_VIEW_MESSAGE_DETAIL', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, { type: 'GET_VIEW_MESSAGE_DETAIL' });
    expect(state).toEqual({ messageDetail: {}, modalType: NO_MODAL });
  });
  it('+++ reducer for DELETE_SECURE_MESSAGE_SUCCESS', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, {
      type: 'DELETE_SECURE_MESSAGE_SUCCESS',
    });
    expect(state).toEqual({ messageDetail: {}, modalType: DELETE_MODAL });
  });
  it('+++ reducer for ARCHIVE_SECURE_MESSAGE_SUCCESS', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, {
      type: 'ARCHIVE_SECURE_MESSAGE_SUCCESS',
    });
    expect(state).toEqual({ messageDetail: {}, modalType: ARCHIVE_MODAL });
  });
  it('+++ reducer for UNARCHIVE_SECURE_MESSAGE_SUCCESS', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, {
      type: 'UNARCHIVE_SECURE_MESSAGE_SUCCESS',
    });
    expect(state).toEqual({ messageDetail: {}, modalType: UNARCHIVE_MODAL });
  });
  it('+++ reducer for UPDATE_SECURE_MESSAGE_SUCCESS', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, {
      type: 'UPDATE_SECURE_MESSAGE_SUCCESS',
    });
    expect(state).toEqual({ messageDetail: {}, modalType: NO_MODAL });
  });
  it('+++ reducer for SET_POPUP_STATE', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, { type: 'SET_POPUP_STATE' });
    expect(state).toEqual({ messageDetail: {}, modalType: NO_MODAL });
  });
  it('+++ reducer for default', () => {
    let state = { messageDetail: {}, modalType: NO_MODAL };
    state = ViewMessageReducer(state, { type: '' });
    expect(state).toEqual({ messageDetail: {}, modalType: NO_MODAL });
  });
});
