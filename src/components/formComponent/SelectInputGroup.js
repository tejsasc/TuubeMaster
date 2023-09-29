import React from "react";
import { Form } from "react-bootstrap";

const SelectInputGroup = (props) => {
  return (
    <Form.Select
      onChange={props.change}
      className={props.class}
      aria-label="Default select example"
      value={props.val}
    >
      {props.options.map((option) => (
        <option value={option.value} key={option.key}>
          {option.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectInputGroup;
