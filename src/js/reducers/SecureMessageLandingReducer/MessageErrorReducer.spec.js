import reducer from "./MessageErrorReducer";
import AppConstants from "../../constants/AppConstants";
import { READ, ARCHIVED } from "../../constants/StringsConstants";

describe("MessageErrorReducer", () => {
    
    const initialstate = {
        error: false,
        newMessageError: false,
        draftError: false,
        failedUpdateType: undefined,
        failedReq: undefined
    }
    Object.freeze(initialstate);

    it("receives ARCHIVE_SECURE_MESSAGE_FAILURE", () => {
        
        const newState = reducer(initialstate, {
            type: AppConstants.ARCHIVE_SECURE_MESSAGE_FAILURE,
            payload: {
                requestData: {
                    id: 'C12356',
                    status: READ
                }
            },
        });

        expect(newState).toEqual({
            ...initialstate,
            failedUpdateType: AppConstants.ARCHIVE_SECURE_MESSAGE,
            failedReq: {
                id: 'C12356',
                status: READ
            }
        })
    });

    it("receives UNARCHIVE_SECURE_MESSAGE_FAILURE", () => {
        const newState = reducer(initialstate, {
            type: AppConstants.UNARCHIVE_SECURE_MESSAGE_FAILURE,
            payload: {
                requestData: {
                    id: 'C12356',
                    status: ARCHIVED
                }
            },
        });

        expect(newState).toEqual({
            ...initialstate,
            failedUpdateType: AppConstants.UNARCHIVE_SECURE_MESSAGE,
            failedReq: {
                id: 'C12356',
                status: ARCHIVED
            }
        })
    });

    it("receives DELETE_SECURE_MESSAGE_FAILURE", () => {
        const newState = reducer(initialstate, {
            type: AppConstants.DELETE_SECURE_MESSAGE_FAILURE,
            payload: {
                requestData: {
                    id: 'C12356',
                    status: READ
                }
            },
        });

        expect(newState).toEqual({
            ...initialstate,
            failedUpdateType: AppConstants.DELETE_SECURE_MESSAGE,
            failedReq: {
                id: 'C12356',
                status: READ
            }
        })
    });

    it("receives REQUEST_SECURE_MESSAGES_SUCCESS", () => {
        const newState = reducer(initialstate, {
            type: AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS,
        });

        expect(newState).toEqual({
            ...initialstate,
            error: false
        })
    });

    it("receives REQUEST_SECURE_MESSAGES_FAILURE", () => {
        const newState = reducer(initialstate, {
            type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
        });

        expect(newState).toEqual({
            ...initialstate,
            error: true
        })
    });

    it("receives UPDATE_SECURE_MESSAGE_SUCCESS", () => {
        const state = {
            ...initialstate,
            draftError: true,
            newMessageError: true
        };
        Object.freeze(state);
        const newState = reducer(state, {
            type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
        });

        expect(newState).toEqual({
            ...state,
            draftError: false,
            newMessageError: false
        })
    });

    it("receives UPDATE_SECURE_MESSAGE_DRAFT_FAILURE", () => {

        const newState = reducer(initialstate, {
            type: AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE,
        });

        expect(newState).toEqual({
            ...initialstate,
            draftError: true,
        })
    });

    it("receives UPDATE_NEW_SECURE_MESSAGE_FAILURE", () => {

        const newState = reducer(initialstate, {
            type: AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE,
        });

        expect(newState).toEqual({
            ...initialstate,
            newMessageError: true,
        })
    });

    it("receives SET_POPUP_STATE", () => {
        const state = {
            ...initialstate,
            failedUpdateType: AppConstants.DELETE_SECURE_MESSAGE,
            failedReq: {
                id: '1234'
            }
        }
        Object.freeze(state);

        const newState = reducer(state, {
            type: AppConstants.SET_POPUP_STATE,
        });

        expect(newState).toEqual(initialstate);
    });

    it("unknown action - dont change state", () => {
        const state = {
            ...initialstate,
            failedUpdateType: AppConstants.DELETE_SECURE_MESSAGE,
            failedReq: {
                id: '1234'
            }
        }
        Object.freeze(state);

        const newState = reducer(state, {
            type: 'DUMMY',
        });

        expect(newState).toEqual(state);
    });

})