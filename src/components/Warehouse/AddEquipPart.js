import React, { useState } from "react";
import Modal from "../UI/Modal";
import TTDForm from "../TTD/TTDForm";
import BDDForm from "../BDD/BDDForm";
import CalibrationRackForm from "../calibrationRack/CalibrationRackForm";
import SwabMasterForm from "../swabMaster/SwabMasterForm";
import AirHoseForm from "../Parts/AirHose/AirHoseForm";
import BDDTSRForm from "../Parts/BddTsr/BDDTSRForm";
import DHForm from "../Parts/DeviceHose/DHForm";
import PSForm from "../Parts/PressureSensors/PSForm";
import SOForm from "../Parts/SupplyOrifices/SOForm";
import SMTSRForm from "../Parts/SMTSR/SMTSRForm";
import TTDTSRForm from "../Parts/TTDTSR/TTDTSRFORM";
import COForm from "../Parts/CalibrationOrifice/COForm";
import AllGeneralPartForm from "../Parts/AllGeneralParts/AllGeneralPartForm";

const AddEquipPart = (props) => {
  const [modalData, setModalData] = useState(null);
  const headerEquip = <h4>Add Equipment</h4>;
  // const headerAllGeneralPart = <h4>Add All General Part</h4>;
  const headerParts = <h4>Add Parts</h4>;
  const showEquip = function (component, isEquip = false) {
    let param1, param2;
    if (isEquip) {
      param1 = headerEquip;
      param2 = bodyEquip;
    } else {
      param1 = headerParts;
      param2 = bodyParts;
    }
    setModalData(
      <Modal
        show={true}
        close={() => {
          setModalData(null);
        }}
        isLoading={false}
        showHeader={true}
        showBody={true}
        showFooter={false}
        modalHead={
          <button
            className="btn btn-outline-primary"
            onClick={showModal.bind(null, param1, param2)}
          >
            Go Back
          </button>
        }
        modalBody={component}
      />
    );
  };

  const createDataObj = function (name) {
    return {
      submitBtn: `Add ${name}`,
      submittingBtn: `Adding ${name}`,
      title: `Add ${name}`,
      isEdit: false,
      editId: -1,
    };
  };

  const bodyEquip = (
    <div className="flexJustifyCFW">
      <button
        onClick={showEquip.bind(
          null,
          <TTDForm
            isWhEdit={true}
            whId={props.whId}
            // whName={}
            refresh={props.setRefreshTable}
            data={createDataObj("TTD")}
            editId={null}
          />,
          true
        )}
        className="btn  btn-primary"
      >
        TTD
      </button>
      <button
        onClick={showEquip.bind(
          null,
          <BDDForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("BDD")}
          />,
          true
        )}
        className="btn  btn-primary"
      >
        BDD
      </button>
      <button
        onClick={showEquip.bind(
          null,
          <CalibrationRackForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("Calibration Rack")}
          />,
          true
        )}
        className="btn  btn-primary"
      >
        Calibration Rack
      </button>
      <button
        onClick={showEquip.bind(
          null,
          <SwabMasterForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("Swab Master")}
          />,
          true
        )}
        className="btn  btn-primary"
      >
        Swab Master
      </button>
    </div>
  );

  const bodyAllGeneralPart = (
    <AllGeneralPartForm
      isWhEdit={true}
      whId={props.whId}
      refresh={props.setRefreshTable}
      data={createDataObj("All General Parts")}
      editId={null}
    />
  );

  const bodyParts = (
    <div className="flexJustifyCFW">
      {/* <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <AllGeneralPartForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("All General Parts")}
            editId={null}
          />,
          false
        )}
      >
        All General Parts
      </button> */}
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <AirHoseForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("Air Hose")}
            editId={null}
          />,
          false
        )}
      >
        Air Hose
      </button>
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <BDDTSRForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("BDD TSR")}
            editId={null}
          />,
          false
        )}
      >
        BDD Tube Seal Rack
      </button>
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <COForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("Calibration Orifice")}
            editId={null}
          />,
          false
        )}
      >
        Calibration Orifice
      </button>
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <DHForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("Device Hose")}
            editId={null}
          />,
          false
        )}
      >
        Device Hose
      </button>
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <PSForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("Pressure Sensor")}
            editId={null}
          />,
          false
        )}
      >
        Pressure Sensors
      </button>
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <SOForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("Supply Orifice")}
            editId={null}
          />,
          false
        )}
      >
        Supply Orifice
      </button>
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <SMTSRForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("SM TSR")}
            editId={null}
          />,
          false
        )}
      >
        SM Tube Seal Rack
      </button>
      <button
        className="btn  btn-primary"
        onClick={showEquip.bind(
          null,
          <TTDTSRForm
            isWhEdit={true}
            whId={props.whId}
            refresh={props.setRefreshTable}
            data={createDataObj("TTD TSR")}
            editId={null}
          />,
          false
        )}
      >
        TTD Tube Seal Rack
      </button>
    </div>
  );
  const showModal = function (header, body) {
    setModalData(
      <Modal
        show={true}
        close={() => {
          setModalData(null);
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

  return (
    <>
      <div className="flexJustifyCG25 mb-3">
        <button
          onClick={showModal.bind(null, headerEquip, bodyEquip)}
          className="btn btn-primary"
        >
          Add Equipment
        </button>
        <button
          onClick={showModal.bind(null, headerParts, bodyParts)}
          className="btn btn-primary"
        >
          Add Parts
        </button>
        <button
          className="btn  btn-primary"
          // onClick={showEquip.bind(
          //   null,
          //   headerAllGeneralPart,
          //   bodyAllGeneralPart
          // )}
          onClick={() => {
            setModalData(
              <Modal
                show={true}
                close={() => {
                  setModalData(null);
                }}
                isLoading={false}
                showHeader={true}
                showBody={true}
                showFooter={false}
                modalHead=""
                modalBody={bodyAllGeneralPart}
              />
            );
          }}
        >
          All General Parts
        </button>{" "}
      </div>
      {modalData}
    </>
  );
};

export default AddEquipPart;
