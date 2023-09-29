import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingData = (props) => {
  return (
    <div className={props.className}>
      <Spinner animation="border" role="status" size="lg"></Spinner>
      <span>&nbsp; Loading...</span>
    </div>
  );
};

export default LoadingData;
