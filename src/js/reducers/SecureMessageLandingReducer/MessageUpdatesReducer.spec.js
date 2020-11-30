import reducer from './MessageUpdatesReducer';
import AppConstants from '../../constants/AppConstants';
import {
  READ,
  ARCHIVED,
  DRAFT,
  PENDING,
  NEW,
} from '../../constants/StringsConstants';

describe('MessageUpdatesReducer', () => {
  const initialState = {
    messages: [],
    fetching: false,
    isSavingDraft: false,
    fetched: false,
    updating: false,
    updated: false,
    successModal: false,
    activeTab: 'inbox',
    deletingMessages: [],
    archivingMessages: [],
    unarchivingMessages: [],
    readingMessages: [],
  };

  const archiveSuccessAction = (id) => ({
    type: AppConstants.ARCHIVE_SECURE_MESSAGE_SUCCESS,
    payload: {
      id,
    },
  });

  const unarchiveSuccessAction = (id) => ({
    type: AppConstants.UNARCHIVE_SECURE_MESSAGE_SUCCESS,
    payload: {
      id,
    },
  });

  describe('ARCHIVE_SECURE_MESSAGE_SUCCESS', () => {
    const startState = {
      ...initialState,
      messages: [
        {
          id: 'C12345',
          status: READ,
        },
        {
          id: 'C99999',
          status: READ,
        },
      ],
    };
    Object.freeze(startState);

    it('when message not in unarchiving list', () => {
      const newState = reducer(startState, archiveSuccessAction('C12345'));
      expect(newState).toEqual({
        ...startState,
        archivingMessages: ['C12345'],
      });
    });

    it('when message is in unarchiving list', () => {
      const state = {
        ...startState,
        unarchivingMessages: ['C12345'],
      };
      Object.freeze(state);
      const newState = reducer(state, archiveSuccessAction('C12345'));
      expect(newState).toEqual({
        ...state,
        unarchivingMessages: [],
        archivingMessages: ['C12345'],
      });
    });
  });

  it('UNARCHIVE_SECURE_MESSAGE_SUCCESS - not in archiving list', () => {
    const state = {
      ...initialState,
      messages: [
        {
          id: 'C12345',
          status: ARCHIVED,
        },
        {
          id: 'C99999',
          status: READ,
        },
      ],
    };
    Object.freeze(state);
    const newState = reducer(state, unarchiveSuccessAction('C12345'));
    expect(newState).toEqual({
      ...state,
      unarchivingMessages: ['C12345'],
    });
  });

  it('UNARCHIVE_SECURE_MESSAGE_SUCCESS - exists in archiving list', () => {
    const state = {
      ...initialState,
      archivingMessages: ['C12345'],
      messages: [
        {
          id: 'C12345',
          status: READ,
        },
        {
          id: 'C99999',
          status: READ,
        },
      ],
    };
    Object.freeze(state);
    const newState = reducer(state, unarchiveSuccessAction('C12345'));
    expect(newState).toEqual({
      ...state,
      archivingMessages: [],
      unarchivingMessages: ['C12345'],
    });
  });

  it('DELETE_SECURE_MESSAGE_SUCCESS', () => {
    const state = {
      ...initialState,
      messages: [
        {
          id: 'C12345',
          status: READ,
        },
        {
          id: 'C99999',
          status: READ,
        },
      ],
    };
    Object.freeze(state);
    const newState = reducer(state, {
      type: AppConstants.DELETE_SECURE_MESSAGE_SUCCESS,
      payload: {
        id: 'C12345',
      },
    });
    expect(newState).toEqual({
      ...state,
      deletingMessages: ['C12345'],
    });
  });

  it('SET_SECURE_MESSAGE_READ_SUCCESS', () => {
    const state = {
      ...initialState,
      messages: [
        {
          id: 'C12345',
          status: NEW,
        },
        {
          id: 'C99999',
          status: NEW,
        },
      ],
    };
    Object.freeze(state);
    const newState = reducer(state, {
      type: AppConstants.SET_SECURE_MESSAGE_READ_SUCCESS,
      payload: {
        id: 'C12345',
      },
    });
    expect(newState).toEqual({
      ...state,
      readingMessages: ['C12345'],
    });
  });

  it('UPDATE_SECURE_MESSAGE - status is DRAFT', () => {
    const newState = reducer(initialState, {
      type: AppConstants.UPDATE_SECURE_MESSAGE,
      status: DRAFT,
    });
    expect(newState).toEqual({
      ...initialState,
      updating: false,
      isSavingDraft: true,
    });
  });

  it('UPDATE_SECURE_MESSAGE - status is PENDING', () => {
    const newState = reducer(initialState, {
      type: AppConstants.UPDATE_SECURE_MESSAGE,
      status: PENDING,
    });
    expect(newState).toEqual({
      ...initialState,
      updating: true,
      isSavingDraft: false,
    });
  });

  it('REQUEST_SECURE_MESSAGE', () => {
    const newState = reducer(initialState, {
      type: AppConstants.REQUEST_SECURE_MESSAGES,
    });
    expect(newState).toEqual({
      ...initialState,
      fetching: true,
    });
  });

  it('REQUEST_SECURE_MESSAGES_SUCCESS', () => {
    const state = {
      ...initialState,
      archivingMessages: [
        {
          id: 'C56789',
          status: ARCHIVED,
        },
      ],
      unarchivingMessages: [
        {
          id: 'C12345',
          status: READ,
        },
      ],
      deletingMessages: ['ABC'],
    };
    Object.freeze(state);
    const newState = reducer(state, {
      type: AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS,
      payload: [
        {
          id: 'C12345',
          status: READ,
        },
        {
          id: 'C56789',
          status: ARCHIVED,
        },
      ],
    });
    expect(newState).toEqual({
      ...initialState,
      unarchivingMessages: [],
      archivingMessages: [],
      deletingMessages: [],
      messages: [
        {
          id: 'C12345',
          status: READ,
        },
        {
          id: 'C56789',
          status: ARCHIVED,
        },
      ],
      fetched: true,
      fetching: false,
    });
  });

  it('REQUEST_SECURE_MESSAGE_FAILURE', () => {
    const newState = reducer(initialState, {
      type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
    });
    expect(newState).toEqual({
      ...initialState,
      fetched: true,
      fetching: false,
    });
  });

  it('REQUEST_ACCOUNTS_FAILURE', () => {
    const newState = reducer(initialState, {
      type: AppConstants.REQUEST_ACCOUNTS_FAILURE,
    });
    expect(newState).toEqual({
      ...initialState,
      fetched: true,
      fetching: false,
    });
  });

  it('REQUEST_TAB_ACTIVE', () => {
    const newState = reducer(initialState, {
      type: AppConstants.REQUEST_TAB_ACTIVE,
      payload: 'inbox',
    });
    expect(newState).toEqual({
      ...initialState,
      activeTab: 'inbox',
    });
  });

  it('UPDATE_SECURE_MESSAGE_DRAFT_FAILURE', () => {
    const state = {
      ...initialState,
      updating: true,
    };
    Object.freeze(state);
    const newState = reducer(state, {
      type: AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE,
    });
    expect(newState).toEqual({
      ...initialState,
      updating: false,
      isSavingDraft: false,
    });
  });

  it('UPDATE_NEW_SECURE_MESSAGE_FAILURE', () => {
    const state = {
      ...initialState,
      updating: true,
    };
    Object.freeze(state);
    const newState = reducer(state, {
      type: AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE,
    });
    expect(newState).toEqual({
      ...initialState,
      updating: false,
      isSavingDraft: false,
    });
  });

  it('SET_POPUP_STATE', () => {
    const state = {
      ...initialState,
      successModal: true,
    };
    Object.freeze(state);
    const newState = reducer(state, {
      type: AppConstants.SET_POPUP_STATE,
    });
    expect(newState).toEqual({
      ...initialState,
      successModal: false,
    });
  });

  it('unknown action - default', () => {
    const state = {
      ...initialState,
      successModal: true,
    };
    Object.freeze(state);
    const newState = reducer(state, {
      type: 'UNKNOWN',
    });
    expect(newState).toEqual(state);
  });
});
