import { createNewMessage, updateMessage, replyMessage } from "../MessageParser";
import { DRAFT } from "../../constants/StringsConstants";

const name = {
    title: "Mr",
    first_name: "Jolly",
    middle_name: "P",
    last_name: "Ants"
};


describe('createNewMessage Tests', () => {
  let data;
  beforeEach(() => {
    data = {
        subject: "Technical Support",
        message: "Some simple message text",
    }
  })

  it('when there is no account then the message should have undefined account', () => {
    const message = createNewMessage(data, DRAFT, name);
    expect(message.account).toBe(undefined);
  });

  it('when there is an account then the message should contain the account details', () => {
        data.number = "12345";
        data.id = "98765";
        
        const message = createNewMessage(data, DRAFT, name);
        const expectedMessage = {
            secure_message: {
                subject: data.subject,
                user: {
                    name: {
                        title: name.title,
                        first_name: name.first_name,
                        middle_name: name.middle_name,
                        last_name: name.last_name
                    }
                },
                thread_id: undefined,
                account: {
                    number: data.number,
                    id: data.id
                },
                payload: {
                    body: {
                        data: data.message,
                    },
                    headers: undefined
                },
                status: DRAFT,
            }
    
        }
        expect(message).toEqual(expectedMessage);
  });

  it('when there is no name then the user should be undefined', () => {
    const message = createNewMessage(data, DRAFT, undefined);
    expect(message.user).toBe(undefined);
  });

});

describe('updateMessage Tests', () => {
    let data;
    beforeEach(() => {
      data = {
          subject: "Technical Support",
          message: "Some simple message text",
      }
    })
  
    it('has no-reply-to header with message id', () => {
      const message = updateMessage(data, "C0122455", DRAFT);
      const expectedMessage = {
          secure_message: {
              subject: data.subject,
              thread_id: undefined,
              account: undefined,
              payload: {
                  body: {
                      data: data.message,
                  },
                  headers: [{
                      name: "In-Reply-To",
                      value: "C0122455" 
                  }]
              },
              user: undefined,
              status: DRAFT,
          }
      }
  
      expect(message).toEqual(expectedMessage);
  
    });

    it('has no account then no account specified', () => {
        const message = updateMessage(data, "C0122455", DRAFT);    
        expect(message.account).toBe(undefined);
    
    });

    it('has account then message has account detail', () => {
        data.number = "123456";
        data.id = "00212";
        const message = updateMessage(data, "C0122455", DRAFT);
        const expectedMessage = {
            secure_message: {
                subject: data.subject,
                thread_id: undefined,
                account: {
                    id: data.id,
                    number: data.number
                },
                payload: {
                    body: {
                        data: data.message,
                    },
                    headers: [{
                        name: "In-Reply-To",
                        value: "C0122455" 
                    }]
                },
                user: undefined,
                status: DRAFT,
            }
        }
        expect(message).toEqual(expectedMessage);
    });
  
   
  });

  describe('replyMessage tests', () => {
    let data;
    beforeEach(() => {
      data = {
          subject: "Technical Support",
          message: "Some simple message text",
      }
    })
  
    it('has no name then user should be undefined', () => {
      const message = replyMessage(data, {id: "C0122455", threadID: "12345"}, DRAFT, name);
      expect(message.user).toBe(undefined);  
    });

    it('has no account then user should be undefined', () => {
        const message = replyMessage(data, {id: "C0122455", threadID: "12345"}, DRAFT, name);
        expect(message.account).toBe(undefined);
    });

    it('has no threadID then threadID should be undefined', () => {
        const message = replyMessage(data, {id: "C0122455", threadID: null}, DRAFT, name);
        expect(message.threadID).toBe(undefined);
    });

    it('with account, name & threadID then the message appears correctly', () => {
        data.number = "123456";
        data.id = "00212";
        const message = replyMessage(data, {id: "C0122455", threadID: "98765"}, DRAFT, name);
        const expectedMessage = {
            secure_message: {
                subject: data.subject,
                thread_id: "98765",
                account: {
                    id: data.id,
                    number: data.number
                },
                payload: {
                    body: {
                        data: data.message,
                    },
                    headers: [{
                        name: "In-Reply-To",
                        value: "C0122455" 
                    }]
                },
                user: {
                    name: {
                        title: name.title,
                        first_name: name.first_name,
                        middle_name: name.middle_name,
                        last_name: name.last_name
                    }
                },
                status: DRAFT,
            }
        }
        expect(message).toEqual(expectedMessage);
    });
  
   
  });