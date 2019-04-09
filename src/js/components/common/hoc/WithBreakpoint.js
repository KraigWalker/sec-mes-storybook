/* eslint no-magic-numbers:0 */
import React from "react";

const throttle = (fn, wait) => {
  let time = Date.now();
  return () => {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
};

const breakpoints = {
  xs: [0, 320],
  sm: [321, 640],
  md: [641, 959],
  lg: [960, 1280],
  xl: [1281, Infinity]
};

const calculateBreakPoint = width =>
  Object.keys(breakpoints).reduce((prevValue, currentValue) => {
    const breakpoint = breakpoints[currentValue];
    if (width >= breakpoint[0] && width <= breakpoint[1]) {
      return currentValue;
    }
    return prevValue;
  }, "xs");

export const withBreakpoints = WrappedComponent =>
  class WithBreakpoints extends React.Component {
    constructor(props) {
      super(props);
      this.handleResize = this.handleResize.bind(this);

      window.addEventListener("resize", throttle(this.handleResize, 500));
      this.state = {
        breakpoint: calculateBreakPoint(window.innerWidth)
      };
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {

    console.log("breakpoints");
    console.log(window.innerWidth);
    console.log(calculateBreakPoint(window.innerWidth));
      this.setState({
        breakpoint: calculateBreakPoint(window.innerWidth)
      });
    }

    render() {
      return <WrappedComponent breakpoints={breakpoints} {...this.state} {...this.props} />;
    }
  };
