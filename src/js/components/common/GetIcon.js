import React from "react";

const CommonGetIcon = (props) => {
  return (
    <svg
      role="img"
      fill={props.fill}
      className={props.className}
      viewBox={props.viewbox ? props.viewbox : "0 0 32 32"}
      width={props.width ? props.width : "32px"}
      height={props.height ? props.height : "32px"}
    >
      <use xlinkHref={`${window.baseURl}/images/icons.svg#${props.id}`} />
    </svg>
  );
};

export default CommonGetIcon;
