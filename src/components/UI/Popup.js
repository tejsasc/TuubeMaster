import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { uiAction } from "../../store/uiStore";
import { useDispatch, useSelector } from "react-redux";

const Popup = (props) => {
  // console.log("i am running");
  const dispatch = useDispatch();
  const uiData = useSelector((state) => state.uiStore);
  // console.log("ui data is", uiData);
  return (
    <div aria-live="polite" aria-atomic="true" className="bg-dark">
      <ToastContainer className="p-3" position="top-center">
        <Toast
          onClose={() =>
            dispatch(
              uiAction.setNotification({
                show: false,
                heading: null,
                msg: null,
              })
            )
          }
          show={uiData.notification.show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{uiData.notification.heading}</strong>
          </Toast.Header>
          <Toast.Body>{uiData.notification.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Popup;
