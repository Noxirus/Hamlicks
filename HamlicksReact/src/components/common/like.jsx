import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

const Like = (props) => {
  if (props.liked) {
    return (
      <FontAwesomeIcon
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        icon={fullHeart}
      />
    );
  } else {
    return (
      <FontAwesomeIcon
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
        icon={emptyHeart}
      />
    );
  }
};
export default Like;
