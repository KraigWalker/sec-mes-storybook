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

const mobileViews = ["xs", "sm"];

const calculateBreakPoint = width =>
  Object.keys(breakpoints).reduce((prevValue, currentValue) => {
    const breakpoint = breakpoints[currentValue];
    if (width >= breakpoint[0] && width <= breakpoint[1]) {
      return currentValue;
    }
    return prevValue;
  }, "xs");

const getContainerSize = breakpoint => breakpoint === "xl" ? "lg" : breakpoint.substr(0,2);

const getNoPadding = breakpoint => mobileViews.some(size => size === breakpoint);

export const withBreakpoints = WrappedComponent =>
  class WithBreakpoints extends React.Component {
    constructor(props) {
      super(props);
      this.handleResize = this.handleResize.bind(this);
      //IE 11 setting innerWidth incorrectly on load
      const width = window.innerWidth ? window.innerWidth : window.outerWidth;
      const breakpoint = calculateBreakPoint(width);

      window.addEventListener("resize", throttle(this.handleResize, 500));
      this.state = {
        breakpoint,
        containerSize: getContainerSize(breakpoint),
        noPadding: getNoPadding(breakpoint)
      };
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }


    handleResize() {
      const breakpoint = calculateBreakPoint(window.innerWidth);
      this.setState({
        breakpoint,
        noPadding: getNoPadding(breakpoint),
        containerSize: getContainerSize(breakpoint)
      });
    }

    render() {
      return <WrappedComponent breakpoints={breakpoints} {...this.state} {...this.props} />;
    }
  };
