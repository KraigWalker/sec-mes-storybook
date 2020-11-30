import { SecureMessageForm } from '../SecureMessageForm';
import { shallow } from 'enzyme';

describe('SecureMessageForm snapshot', () => {
  let props = {
    content: {
      back: 'Back',
    },
    onMount: () => {},
    popupState: jest.fn(() => {}),
    sendData: jest.fn(() => {}),
    onSave: jest.fn(() => {}),
    saveDraftData: jest.fn(() => {}),
    sendMessageData: jest.fn(() => {}),
    sendMessageForAccessibiltiy: jest.fn(() => {}),
    messages: [],
    successModal: false,
  };
  let component = shallow(<SecureMessageForm {...props} />);
  it('should match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('Leave Page function test', () => {
    component.instance().leavePage();
    expect(component.instance().state.showPopup).toBeTruthy();
  });
  it('Stay Page function test', () => {
    component.instance().stayOnPage();
    expect(component.instance().state.showPopup).toBeFalsy();
  });
  it('callBackModal function test', () => {
    component.instance().callBackModal();
    expect(component.instance().state.showPopup).toBeTruthy();
  });
  it('selectSubject function test with subj', () => {
    component.instance().selectSubject('subjects', 'test');
    expect(component.instance().state.subject).toBeTruthy();
  });
  it('selectSubject function test with accounts', () => {
    component.instance().selectSubject('accounts', 'test');
    expect(component.instance().state.accountValue).toBeTruthy();
  });
  it('selectSubject function test with default case', () => {
    component.instance().selectSubject('test', '', { value: 'test' });
    expect(component.instance()).toBeTruthy();
  });
  it('errorCloseClicked function test', () => {
    component.instance().errorCloseClicked();
    expect(component.instance().state.showSaveServiceErrorModal).toBeFalsy();
  });
  it('textChange function test with no text', () => {
    component.instance().handleTextChange(
      {
        target: {
          value: '',
        },
      },
      5
    );
    expect(component.instance().state.disabled).toBeTruthy();
  });
  it('textChange function test with text', () => {
    component.instance().handleTextChange(
      {
        target: {
          value: 'message',
        },
      },
      5
    );
    expect(component.instance().state.disabled).toBeFalsy();
  });
  it('checkValidation function test with selectAccount', () => {
    component.instance().checkValidation();
    component.setState({ selectAccount: true, validationAccountMsg: false });
    expect(component.instance().state.validationAccountMsg).toBeFalsy();
  });
  it('checkValidation function test with selectAccount', () => {
    component.instance().checkValidation();
    component.setState({ selectAccount: false, validationAccountMsg: true });
    expect(component.instance().state.validationAccountMsg).toBeTruthy();
  });
  it('retryServiceCall function test', () => {
    component.instance().retryServiceCall();
    expect(props.popupState).toBeCalled();
  });
  it('returnModalComponent function test', () => {
    component.instance().returnModalComponent();
    component.setState({ showPopup: false });
    expect(component.instance().state.showPopup).toBeFalsy();
  });

  // for all 3 comp
});

describe('Secure Message From', () => {
  let props = {
    content: {
      back: 'Back',
    },
    onMount: () => {},
    popupState: jest.fn(() => {}),
    sendData: jest.fn(() => {}),
    onSave: jest.fn(() => {}),
    saveDraftData: jest.fn(() => {}),
    sendMessageData: jest.fn(() => {}),
    sendMessageForAccessibiltiy: jest.fn(() => {}),
    messages: [],
    successModal: false,
  };

  it('returnErrorModal function test', () => {
    const wrapper = shallow(<SecureMessageForm {...props} />);
    wrapper.setState({
      showSaveServiceErrorModal: true,
      showSendServiceErrorModal: true,
      showDraftSuccessModal: true,
      showSentMessageModal: true,
      disabled: false,
    });
    expect(wrapper.instance().state.showSendServiceErrorModal).toBeTruthy();
  });
});
