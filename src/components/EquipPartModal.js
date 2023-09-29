import React from "react";
import Modal from "./UI/Modal";

const EquipPartModal = (props) => {
  return (
    <Modal
      show={props.show}
      close={props.closeModal}
      isLoading={false}
      showHeader={true}
      showBody={true}
      showFooter={false}
      modalBody={props.body}
      modalHead={props.title}
    />
  );
};

export default EquipPartModal;
