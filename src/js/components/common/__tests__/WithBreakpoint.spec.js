import React from "react";
import { withBreakpoints } from "../hoc/WithBreakpoint";
import { shallow } from "enzyme";

const setup = (props = {}) => {
  const Inner = () => <div />;
  const Component = withBreakpoints(Inner);

  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

describe("withBreakpoints", () => {
  it("passes props to wrappedcomponent", () => {
    const wrapper = setup({ someProp: "foobar" });
    expect(wrapper.prop("someProp")).toBe("foobar");
  });

  it("passes breakpoint", () => {
    // @ts-ignore
    window.innerWidth = 500;
    const wrapper = setup();
    expect(wrapper.prop("breakpoint")).toBe("sm");
  });

  it("passes noPadding is false when mobile view", () => {
    // @ts-ignore
    window.innerWidth = 500;
    const wrapper = setup();
    expect(wrapper.prop("noPadding")).toBe(true);
  });

  it("passes noPadding is false when mobile view", () => {
    // @ts-ignore
    window.innerWidth = 500;
    const wrapper = setup();
    expect(wrapper.prop("noPadding")).toBe(true);
  });

  it("passes noPadding is false when mobile view", () => {
    // @ts-ignore
    window.innerWidth = 1000;
    const wrapper = setup();
    expect(wrapper.prop("noPadding")).toBe(false);
  });

  it("passes containersize", () => {
    // @ts-ignore
    window.innerWidth = 500;
    const wrapper = setup();
    expect(wrapper.prop("containerSize")).toBe("sm");
  });

  it("passes containersize lg for xl", () => {
    // @ts-ignore
    window.innerWidth = 2000;
    const wrapper = setup();
    expect(wrapper.prop("containerSize")).toBe("lg");
  });

});
