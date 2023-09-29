import React, { useState } from "react";
import Modal from "./Modal";

const DismentalPopup = (props) => {
  const [sendingReq, setSendingReq] = useState(false);
  const header = <h4>Dismantle {props.name}</h4>;
  const body = (
    <>
      <h5 className="grid3Auto">
        {props.data.map((data) => {
          return (
            <>
              <span>{data.name}</span>:
              <span>{data.val ? data.val : "Not Configured"}</span>
            </>
          );
        })}
      </h5>

      <div className="delete-modal__action text-center">
        <p>Above Parts will be Dismantle Are you sure ?</p>
        <button
          class="btn btn-secondary mb-2 me-4"
          onClick={() => {
            props.setpopup("");
          }}
        >
          Cancel
        </button>
        <button
          class="btn btn-danger mb-2 me-4"
          onClick={() => {
            setSendingReq(true);
            props.dismentalEquip(props.id, props.name);
          }}
          disabled={sendingReq}
        >
          {sendingReq ? "Dismantling" : "Dismantle"}
        </button>
      </div>
    </>
  );
  // const footer = "";
  return (
    <Modal
      show={true}
      close={() => {
        props.setpopup("");
      }}
      isLoading={false}
      showHeader={true}
      showBody={true}
      showFooter={false}
      modalHead={header}
      modalBody={body}
    />
  );
};

export default DismentalPopup;
