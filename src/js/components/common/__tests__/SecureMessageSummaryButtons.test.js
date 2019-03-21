import React from 'react';
import { mount } from 'enzyme';
import SecureMessageSummaryButtons from "../SecureMessageSummaryButtons";
import content from "../../../content";
import { Switch, BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';

describe("SecureMessageSummaryButtons", () => {

    const setup = (props) => {
        const wrapper = mount(<BrowserRouter><SecureMessageSummaryButtons {...props} /></BrowserRouter>);
        return {
          wrapper,
          props
        }
      }

    it("renders Reply button if noReply flag not set & READ status", () => {
      const { wrapper } = setup({
        message: {
          status: 'READ',
         
          getSubject: jest.fn(),
          getReference: jest.fn(),
          getMessageBody: jest.fn(),
          getDateCreated: jest.fn()
        },
        readOnly: false,
        noReply: false,
        threadFlag: false,
        content: content.CB
      });
      expect(wrapper.find("#replyMsg")).toHaveLength(1);
    });
  
    it("does not Render Reply button if noReply flag set & READ status", () => {
      const { wrapper } = setup({
        message: {
          status: 'READ',
          getSubject: jest.fn(),
          getReference: jest.fn(),
          getMessageBody: jest.fn(),
          getDateCreated: jest.fn(),
        },
        readOnly: false,
        content: content.CB,
        threadFlag: false,
        noReply: true,

      });
      expect(wrapper.find("#replyMsg")).toHaveLength(0);
    });
  });