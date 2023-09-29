import React from "react";
import { Button, Modal } from "react-bootstrap";
import LoadingData from "./LoadingData";

const modal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.close}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props?.showHeader ? (
        <Modal.Header closeButton>
          <Modal.Title>{props.modalHead}</Modal.Title>
        </Modal.Header>
      ) : (
        ""
      )}
      {props?.showBody ? (
        <Modal.Body>
          {props.isLoading ? (
            <div className="text-center">
              <LoadingData className="loading-spinner-flex" />
            </div>
          ) : (
            props.modalBody
          )}
        </Modal.Body>
      ) : (
        ""
      )}
      {props?.showFooter ? (
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
        </Modal.Footer>
      ) : (
        " "
      )}
    </Modal>
  );
};

export default modal;
