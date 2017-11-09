
export default function reducer(state={
    messages: []
}, action) {

  switch (action.type) {
    case 'REQUEST_SECURE_MESSAGES':
      return {...state, requestToken: true };

    case "REQUEST_SECURE_MESSAGES_SUCCESS": {
      return {...state,
        messages: action.payload
      };
    }

    case "REQUEST_SECURE_MESSAGES_ACCESS_ERROR":{
      return {...state,
        messages: action.messages
      };
    }

    case "REQUEST_SECURE_MESSAGES_TECH_ERROR":{
      return {...state,
        messages: action.messages
      };
    }

    default:
    return state;
  }
}
