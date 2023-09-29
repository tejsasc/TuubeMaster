import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ajaxCall } from "../../../helpers/ajaxCall";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../../store/uiStore";

const ValInput = (props) => {
  // console.log("props are", props);
  const [isEditMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputVal, setInputVal] = useState(props.val);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authStore);

  const updateData = async (val) => {
    setIsUpdating(true);
    console.log(JSON.stringify({ [props.keyDB]: inputVal }));
    const response = await ajaxCall(
      `/get/project/${props.proId}/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: "PATCH",
        body: JSON.stringify({ [props.keyDB]: inputVal }),
        // signal,
      },
      8000
      // timeoutfun
    );
    // console.log(response);
    if (response.status !== 200) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "Project",
          msg: `Some Problem Occured, Please try again...`,
        })
      );
      setIsUpdating(false);
    }
    dispatch(
      uiAction.setNotification({
        show: true,
        heading: "Project",
        msg: `Value ${inputVal} Edited Successfully`,
      })
    );
    setIsUpdating(false);
  };
  if (!props.isUpdateNeed) {
    return <span>{props.val ? props.val : "N/A"}</span>;
  }
  if (isEditMode) {
    return (
      <Form.Group className="mb-3" controlId="formGroupProName">
        <Form.Control
          autoFocus
          type={props.type}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={() => {
            updateData();
            console.log(" i am done");
            setEditMode(false);
          }}
        />
      </Form.Group>
    );
  } else if (isUpdating) {
    return <span>Updating</span>;
  } else
    return (
      <span
        onDoubleClick={() => {
          // console.log(" i am done");
          setEditMode(true);
        }}
      >
        {inputVal ? inputVal : "N/A"}
      </span>
    );
};

export default ValInput;
