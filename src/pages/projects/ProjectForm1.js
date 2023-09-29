import React, { useEffect, useReducer, useState } from "react";
import { Card, Form, Tabs, Tab, Button } from "react-bootstrap";
import SelectionBox from "../../components/UI/Form/SelectionBox";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/uiStore";
// import Multiselect from "multiselect-react-dropdown";
import SingleSelection from "../../components/UI/Form/SingleSelection";
import SelectSearch from "react-select-search";
import Search from "../Search";

const InitialState = {
  projectName: "",
  clientName: [],
  clientId: null,
  unitName: [],
  unitId: null,
  reactorName: [],
  reactorId: [],
  projectNumber: "",
  scopeOfWork: [],
  scopeOfWorkId: [],
  contract: null,
  isSubThenClient: "",
  remark: "",
  equipPrepDate: "",
  equipReadyDate: "",
  equipShipClientDate: "",
  equipDeliveryClientDate: "",
  projectStart: "",
  projectEnd: "",
  equipReturnClient: "",
  equipDeliverTM: null,
  equipRemark: "",
  ttd: [],
  ttdId: [],
  bdd: [],
  bddId: [],
  calibrationStand: [],
  calibrationStandId: [],
  swabMaster: [],
  swabMasterId: [],
  assignedPart: [],
  assignedPartId: [],
  supplyOrific: [],
  supplyOrificId: [],
  pressureSensor: [],
  pressureSensorId: [],
  calibrationOrific: [],
  calibrationOrificId: [],
  swabMasterTsr: [],
  swabMasterTsrId: [],
  deviceHose: [],
  deviceHoseId: [],
  airHose: [],
  airHoseId: [],
};
const reducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

function ProjectForm(props) {
  const [key, setKey] = useState("projectInfo");
  const [formData, dispatchInputChange] = useReducer(reducer, InitialState);
  const authData = useSelector((state) => state.authStore);
  const initialSubmit = {
    isError: false,
    errMsg: null,
    isSubmitting: false,
    submitBtnVal: props.submitBtnTxt,
  };
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [EditDataLoading, setEditDataLoading] = useState(false);
  const getEditProjectData = async () => {
    const response = await ajaxCall(
      `/get/project/${props.proId}/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: "GET",
        // signal,
      },
      8000
      // timeoutfun
    );
    // console.log(response);
    if (response?.status !== 200) return;
    dispatchInputChange({
      all: true,
      data: {
        projectName: response.data?.project_name,
        clientName: [],
        clientId: response.data?.client,
        unitName: [],
        unitId: response.data?.unit,
        reactorName: [],
        reactorId: response.data?.reactor,
        projectNumber: response.data?.project_number,
        scopeOfWork: [],
        scopeOfWorkId: response.data?.scope_of_work,
        contract: response.data?.contract,
        isSubThenClient: response.data?.if_sub_client_name,
        remark: response.data?.general_remarks,
        equipPrepDate: response.data?.equipment_prep,
        equipReadyDate: response.data?.equipment_ready,
        equipShipClientDate: response.data?.equipment_ship_client,
        equipDeliveryClientDate: response.data?.equipment_delivery_client,
        projectStart: response.data?.project_start,
        projectEnd: response.data?.project_end,
        equipReturnClient: response.data?.equipment_return_tubemaster,
        equipDeliverTM: response.data?.equipment_delivery_tubemaster,
        equipRemark: response.data?.equipment_info_remarks,
        ttd: [],
        ttdId: response.data?.ttd,
        bdd: [],
        bddId: response.data?.bdd,
        calibrationStand: [],
        calibrationStandId: response.data?.calibration_stand,
        assignedPart: [],
        assignedPartId: response.data?.part,
        supplyOrific: [],
        supplyOrificId: response.data?.supply_orifice_part,
        pressureSensor: [],
        pressureSensorId: response.data?.pressure_sensor_part,
        calibrationOrific: [],
        calibrationOrificId: response.data?.calibration_orifice_part,
        swabMasterTsr: [],
        swabMasterTsrId: response.data?.swabmaster_part,
        deviceHose: [],
        deviceHoseId: response.data?.device_part,
        airHose: [],
        airHoseId: response.data?.airhose_part,
        swabMaster: [],
        swabMasterId: response.data?.swabmaster_equip,
      },
    });
    setEditDataLoading(true);
    // setLoadError({ isLoading: false, isError: false, isSubmitting: false });
  };

  // get data if it's edit project
  useEffect(() => {
    if (!props.isEdit) return;
    getEditProjectData();
  }, []);

  const appendData = (fieldName, fieldVal, data) => {
    // console.log(typeof fieldVal);
    if (fieldVal) {
      // if (Array.isArray(fieldVal)) {
      //   fieldVal = JSON.stringify(fieldVal);
      // }
      data[fieldName] = fieldVal;
      // data.append(fieldName, fieldVal);
    }
  };
  const getFormData = () => {
    // const data = new FormData();
    const data = {};
    appendData("project_name", formData.projectName, data);
    appendData("client", formData.clientId, data);
    appendData("unit", formData.unitId, data);
    appendData("reactor", formData.reactorId, data);
    appendData("project_number", parseInt(formData.projectNumber), data);
    appendData("scope_of_work", formData.scopeOfWorkId, data);
    appendData("contract", formData.contract, data);
    appendData("if_sub_client_name", formData.isSubThenClient, data);
    appendData("general_remarks", formData.remark, data);
    appendData("equipment_prep", formData.equipPrepDate, data);
    appendData("equipment_ready", formData.equipReadyDate, data);
    appendData("equipment_ship_client", formData.equipShipClientDate, data);
    appendData(
      "equipment_delivery_client",
      formData.equipDeliveryClientDate,
      data
    );
    appendData("project_start", formData.projectStart, data);
    appendData("project_end", formData.projectEnd, data);
    appendData("equipment_return_tubemaster", formData.equipReturnClient, data);
    appendData("equipment_delivery_tubemaster", formData.equipDeliverTM, data);
    appendData("equipment_info_remarks", formData.equipRemark, data);
    appendData("ttd", formData.ttdId, data);
    appendData("bdd", formData.bddId, data);
    appendData("calibration_stand", formData.calibrationStandId, data);
    appendData("supply_orifice_part", formData.supplyOrificId, data);
    appendData("pressure_sensor_part", formData.pressureSensorId, data);
    appendData("calibration_orifice_part", formData.calibrationOrificId, data);
    appendData("swabmaster_part", formData.swabMasterTsrId, data);
    appendData("device_part", formData.deviceHoseId, data);
    appendData("airhose_part", formData.airHoseId, data);
    appendData("swabmaster_equip", formData.swabMasterId, data);
    return data;
  };
  const selectionBoxChanged = (fieldName, proFieldName, val) => {
    // if (isSingle) {
    //   dispatchInputChange({
    //     type: proFieldName,
    //     value: val.id,
    //   });
    //   dispatchInputChange({
    //     type: fieldName,
    //     value: val,
    //   });
    //   return;
    // }
    // console.log(val);
    dispatchInputChange({
      type: fieldName,
      value: val,
    });
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchInputChange({
        type: fieldName,
        value: val,
      });
      dispatchInputChange({
        type: proFieldName,
        value: val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    // console.log("arg is", val);
    // console.log("New val is", newValIds);
    dispatchInputChange({
      type: fieldName,
      value: val,
    });
    dispatchInputChange({
      type: proFieldName,
      value: newValIds,
    });
  };

  const processFormData = async (e) => {
    e.preventDefault();
    if (!formData.scopeOfWorkId?.length) {
      setFormStatus((formData) => ({
        ...formData,
        isError: true,
        errMsg: "Please Select Scope of Work",
      }));
      setKey("general");
      return;
    }
    // const data = {
    //   project_name: formData.projectName,
    //   client: formData.clientId,
    //   unit: formData.unitId,
    //   reactor: formData.reactorId,
    //   project_number: formData.projectNumber,
    //   scope_of_work: formData.scopeOfWorkId,
    //   contract: formData.contract,
    //   if_sub_client_name: formData.isSubThenClient,
    //   general_remarks: formData.remark,
    //   equipment_prep: formData.equipPrepDate,
    //   equipment_ready: formData.equipReadyDate,
    //   equipment_ship_client: formData.equipShipClientDate,
    //   equipment_delivery_client: formData.equipDeliveryClientDate,
    //   project_start: formData.projectStart,
    //   project_end: formData.projectEnd,
    //   equipment_return_tubemaster: formData.equipReturnClient,
    //   equipment_delivery_tubemaster: formData.equipDeliverTM,
    //   equipment_info_remarks: formData.equipRemark,
    //   ttd: formData.ttdId,
    //   bdd: formData.bddId,
    //   calibration_stand: formData.calibrationStandId,
    //   part: formData.assignedPartId,
    //   supply_orifice_part: formData.supplyOrificId,
    //   pressure_sensor_part: formData.pressureSensorId,
    //   calibration_orifice_part: formData.calibrationOrificId,
    //   swabmaster_part: formData.swabMasterTsrId,
    //   device_part: formData.deviceHoseId,
    //   airhose_part: formData.airHoseId,
    // };
    setFormStatus({
      ...formStatus,
      isSubmitting: true,
      submitBtnVal: props.submittingBtnTxt,
    });
    const data = getFormData();

    // console.log(JSON.stringify(data));
    // lets submit data and log the response
    let url = "/createproject/";
    let method = "POST";
    if (props.isEdit) {
      url = `/get/project/${props.proId}/`;
      method = "PATCH";
    }
    const response = await ajaxCall(
      url,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: method,
        body: JSON.stringify(data),
        // signal,
      },
      8000
      // timeOutFunction
    );
    if (response.status === 201) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "Project",
          msg: `Project ${formData.projectName} Created Successfully`,
        })
      );
      navigate(`/`);
    } else if (response.status === 200) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "Project",
          msg: `Project ${formData.projectName} Edited Successfully`,
        })
      );
      navigate(`/`);
    } else {
      setFormStatus((formData) => ({
        isSubmitting: false,
        submitBtnVal: props.submitBtnTxt,
        isError: true,
        errMsg: "Some Problem occured Please try again",
      }));
    }

    // console.log(response);
  };
  return (
    <>
      <div className="col-md-12 mt-3 flexCenter">
        <Card className="col-md-12">
          <Card.Body>
            <Card.Title className="mb-3">
              <h3 className="text-center">{props.title}</h3>
            </Card.Title>
            <Form onSubmit={processFormData}>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="projectInfo" title="Project Info">
                  <div className="row">
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupProName"
                    >
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.projectName}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "projectName",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipPrepDate"
                    >
                      <Form.Label>Equipment Prep</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipPrepDate}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipPrepDate",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipDeliverTM"
                    >
                      <Form.Label>Equipment Delivery tube master</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipDeliverTM}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipDeliverTM",
                            value: e.target.value,
                          })
                        }
                        min={formData.equipPrepDate}
                      />
                    </Form.Group>

                    <SingleSelection
                      groupClass="mb-3 selectbox col-md-6"
                      groupId="formGroupClientName"
                      label="Client Name"
                      isNeed={false}
                      isEdit={props.isEdit}
                      paramId={props.proId}
                      paramName="proid"
                      value={formData.clientId}
                      onChange={(val) => {
                        dispatchInputChange({
                          type: "clientId",
                          value: val,
                        });
                      }}
                      isSearch={true}
                      url="/get/clientlist/"
                      name="clientName"
                      objKey={["official_name"]}
                    />

                    <SingleSelection
                      groupClass="mb-3 selectbox col-md-6"
                      groupId="formGroupUnitName"
                      label="Unit Name"
                      isNeed={false}
                      isEdit={props.isEdit}
                      paramId={props.proId}
                      paramName="proid"
                      value={formData.unitId}
                      onChange={(val) => {
                        dispatchInputChange({
                          type: "unitId",
                          value: val,
                        });
                      }}
                      isSearch={true}
                      url={
                        formData.clientId &&
                        formData.equipPrepDate &&
                        formData.equipDeliverTM
                          ? `/get/unitlist/?client=${formData.clientId}&start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      name="unitNames"
                      objKey={["name_of_unit"]}
                    />
                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "reactorName",
                          value: val,
                        })
                      }
                      isEdit={props.isEdit}
                      idVals={formData.reactorId}
                      paramId={props.proId}
                      paramName="proid"
                      isEditLoading={EditDataLoading}
                      groupClass="mb-3 selectbox col-md-6"
                      groupId="formGroupReactor"
                      label="Reactor Name"
                      value={formData.reactorName}
                      onSelect={addedSelectVal.bind(
                        null,
                        "reactorName",
                        "reactorId",
                        false
                      )}
                      url={
                        formData.clientId && formData.unitId
                          ? `/get/reactor/?client=${formData.clientId}&unit=${formData.unitId}`
                          : ""
                      }
                      name="reactor_name"
                      objKey={["reactor_name"]}
                      isSearch={true}
                      multiple={true}
                      loadMsg={
                        formData.clientName?.length && formData.unitName?.length
                          ? "Loading..."
                          : "Please select Client Name and Unit Name first"
                      }
                    />

                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupProNumber"
                    >
                      <Form.Label>Project Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.projectNumber}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "projectNumber",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </Tab>
                <Tab eventKey="general" title="General">
                  <SelectionBox
                    onEditchange={(val) =>
                      dispatchInputChange({
                        type: "scopeOfWork",
                        value: val,
                      })
                    }
                    isEdit={props.isEdit}
                    paramId={props.proId}
                    paramName="proid"
                    idVals={formData.scopeOfWorkId}
                    isEditLoading={EditDataLoading}
                    groupClass="mb-3 selectbox"
                    groupId="formGroupReactor"
                    label="Scope of work"
                    value={formData.scopeOfWork}
                    onSelect={addedSelectVal.bind(
                      null,
                      "scopeOfWork",
                      "scopeOfWorkId",
                      false
                    )}
                    url={`/get/scopeofwork/`}
                    name="sow_name"
                    objKey={["name"]}
                    isSearch={true}
                    multiple={true}
                    loadMsg="Loading..."
                  />

                  <Form.Group
                    className="mb-3 selectbox"
                    controlId="formGroupContract"
                  >
                    <Form.Label>Contract</Form.Label>
                    <SelectSearch
                      options={[
                        { name: "DIRECT", value: "DIRECT" },
                        { name: "SUB", value: "SUB" },
                      ]}
                      placeholder="Choose from options"
                      value={formData.contract}
                      onChange={(val) => {
                        dispatchInputChange({
                          type: "contract",
                          value: val,
                        });
                      }}
                      name="contract"
                    />
                  </Form.Group>
                  {formData.contract === "SUB" ? (
                    <Form.Group
                      className="mb-3"
                      controlId="formGroupisSubThenClient"
                    >
                      <Form.Label>Client name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.isSubThenClient}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "isSubThenClient",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  ) : (
                    ""
                  )}

                  <Form.Group className="mb-3" controlId="formGroupRemark">
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.remark}
                      onChange={(e) =>
                        dispatchInputChange({
                          type: "remark",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Tab>
                <Tab eventKey="criticalDates" title="Critical Dates">
                  <div className="row">
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipReadyDate"
                    >
                      <Form.Label>Equipment Ready</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipReadyDate}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipReadyDate",
                            value: e.target.value,
                          })
                        }
                        min={formData.equipPrepDate}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipShipClientDate"
                    >
                      <Form.Label>Equipment Ship Client</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipShipClientDate}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipShipClientDate",
                            value: e.target.value,
                          })
                        }
                        min={formData.equipReadyDate}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipDeliveryClientDate"
                    >
                      <Form.Label>Equipment Delivery Client</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipDeliveryClientDate}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipDeliveryClientDate",
                            value: e.target.value,
                          })
                        }
                        min={formData.equipShipClientDate}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupProjectStart"
                    >
                      <Form.Label>Project Start</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.projectStart}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "projectStart",
                            value: e.target.value,
                          })
                        }
                        min={formData.equipDeliveryClientDate}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupProjectEnd"
                    >
                      <Form.Label>Project End</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.projectEnd}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "projectEnd",
                            value: e.target.value,
                          })
                        }
                        min={formData.projectStart}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipReturnClient"
                    >
                      <Form.Label>Equipment return client</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipReturnClient}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipReturnClient",
                            value: e.target.value,
                          })
                        }
                        min={formData.projectEnd}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 "
                      controlId="formGroupEquipRemark"
                    >
                      <Form.Label className="text-center disBlock">
                        Equipment Info Remark
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.equipRemark}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipRemark",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </Tab>
                <Tab eventKey="assignEquipments" title="Assign Equipments">
                  {/* <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>TTD</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ttd}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "ttd",
                        value: e.target.value,
                      })
                    }
                  /> </Form.Group> */}

                  <SelectionBox
                    onEditchange={(val) =>
                      dispatchInputChange({
                        type: "ttd",
                        value: val,
                      })
                    }
                    isNeed={props.isEdit}
                    separator="&"
                    isEdit={props.isEdit}
                    idVals={formData.ttdId}
                    isEditLoading={EditDataLoading}
                    groupClass="mb-3 col-md-12 selectbox"
                    groupId="FromGroupTtd"
                    label="TTD"
                    value={formData.ttd}
                    paramId={props.proId}
                    paramName="proid"
                    onSelect={addedSelectVal.bind(null, "ttd", "ttdId", false)}
                    name="ttd"
                    url={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? `/get/ttd?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                        : ""
                    }
                    isSearch={true}
                    objKey={[
                      "alternate_name",
                      "serial_number",
                      "pm_status",
                      "country",
                    ]}
                    multiple={true}
                    loadMsg={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? "Loading..."
                        : "Please Select Equipment Prep and Equip Return Date First"
                    }
                  />

                  <SelectionBox
                    onEditchange={(val) =>
                      dispatchInputChange({
                        type: "bdd",
                        value: val,
                      })
                    }
                    isNeed={props.isEdit}
                    separator="&"
                    isEdit={props.isEdit}
                    idVals={formData.bddId}
                    paramId={props.proId}
                    paramName="proid"
                    isEditLoading={EditDataLoading}
                    groupClass="mb-3 col-md-12 selectbox"
                    groupId="FromGroupBdd"
                    label="BDD"
                    value={formData.bdd}
                    onSelect={addedSelectVal.bind(null, "bdd", "bddId", false)}
                    name="bdd"
                    url={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? `/get/bdd?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                        : ""
                    }
                    isSearch={true}
                    objKey={[
                      "alternate_name",
                      "serial_number",
                      "pm_status",
                      "country",
                    ]}
                    multiple={true}
                    loadMsg={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? "Loading..."
                        : "Please Select Equipment Prep and Equip Return Date First"
                    }
                  />

                  <SelectionBox
                    onEditchange={(val) =>
                      dispatchInputChange({
                        type: "calibrationStand",
                        value: val,
                      })
                    }
                    isNeed={props.isEdit}
                    separator="&"
                    isEdit={props.isEdit}
                    idVals={formData.calibrationStandId}
                    paramId={props.proId}
                    paramName="proid"
                    isEditLoading={EditDataLoading}
                    groupClass="mb-3 col-md-12 selectbox"
                    groupId="formGroupCalibrationStand"
                    label="Calibration stand"
                    value={formData.calibrationStand}
                    onSelect={addedSelectVal.bind(
                      null,
                      "calibrationStand",
                      "calibrationStandId",
                      false
                    )}
                    name="calibrationStand"
                    url={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? `/get/calibrationstand?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                        : ""
                    }
                    isSearch={true}
                    objKey={[
                      "alternate_name",
                      "serial_number",
                      "pm_status",
                      "country",
                    ]}
                    multiple={true}
                    loadMsg={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? "Loading..."
                        : "Please Select Equipment Prep and Equip Return Date First"
                    }
                  />

                  <SelectionBox
                    onEditchange={(val) =>
                      dispatchInputChange({
                        type: "swabMaster",
                        value: val,
                      })
                    }
                    isNeed={props.isEdit}
                    separator="&"
                    isEdit={props.isEdit}
                    idVals={formData.swabMasterId}
                    paramId={props.proId}
                    paramName="proid"
                    isEditLoading={EditDataLoading}
                    groupClass="mb-3 col-md-12 selectbox"
                    groupId="formGroupswabMaster"
                    label="Swab Master"
                    value={formData.swabMaster}
                    onSelect={addedSelectVal.bind(
                      null,
                      "swabMaster",
                      "swabMasterId",
                      false
                    )}
                    name="swabMaster"
                    url={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? `/get/swabmaster?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                        : ""
                    }
                    isSearch={true}
                    objKey={[
                      "alternate_name",
                      "serial_number",
                      "pm_status",
                      "country",
                    ]}
                    multiple={true}
                    loadMsg={
                      formData.equipPrepDate && formData.equipDeliverTM
                        ? "Loading..."
                        : "Please Select Equipment Prep and Equip Return Date First"
                    }
                  />
                </Tab>
                <Tab eventKey="assignParts" title="Assign Parts">
                  <div className="row">
                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "assignedPart",
                          value: val,
                        })
                      }
                      isNeed={props.isEdit}
                      separator="&"
                      isEdit={props.isEdit}
                      idVals={formData.assignedPartId}
                      isEditLoading={EditDataLoading}
                      paramId={props.proId}
                      paramName="proid"
                      groupClass="mb-3 col-md-6 selectbox"
                      groupId="formGroupAssignedPart"
                      label="Part"
                      value={formData.assignedPart}
                      onSelect={addedSelectVal.bind(
                        null,
                        "assignedPart",
                        "assignedPartId",
                        false
                      )}
                      name="assignedPart"
                      url={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? `/get/part?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      isSearch={true}
                      objKey={[
                        "part_name",
                        "serial_number",
                        "pm_status",
                        "country",
                      ]}
                      multiple={true}
                      loadMsg={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? "Loading..."
                          : "Please Select Equipment Prep and Equip Return Date First"
                      }
                    />

                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "supplyOrific",
                          value: val,
                        })
                      }
                      isNeed={props.isEdit}
                      separator="&"
                      isEdit={props.isEdit}
                      idVals={formData.supplyOrificId}
                      paramId={props.proId}
                      paramName="proid"
                      isEditLoading={EditDataLoading}
                      groupClass="mb-3 col-md-6 selectbox"
                      groupId="formGroupSupplyOrific"
                      label="Supply Orific"
                      value={formData.supplyOrific}
                      onSelect={addedSelectVal.bind(
                        null,
                        "supplyOrific",
                        "supplyOrificId",
                        false
                      )}
                      name="supplyOrific"
                      url={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? `/get/supplyorifice?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      isSearch={true}
                      objKey={["serial_number", "country"]}
                      multiple={true}
                      loadMsg={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? "Loading..."
                          : "Please Select Equipment Prep and Equip Return Date First"
                      }
                    />

                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "pressureSensor",
                          value: val,
                        })
                      }
                      isNeed={props.isEdit}
                      separator="&"
                      isEdit={props.isEdit}
                      idVals={formData.pressureSensorId}
                      isEditLoading={EditDataLoading}
                      paramId={props.proId}
                      paramName="proid"
                      groupClass="mb-3 col-md-6 selectbox"
                      groupId="formGrouppressuresensor"
                      label="Pressure Sensor"
                      value={formData.pressureSensor}
                      onSelect={addedSelectVal.bind(
                        null,
                        "pressureSensor",
                        "pressureSensorId",
                        false
                      )}
                      name="pressureSensor"
                      url={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? `/get/pressuresensor?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      isSearch={true}
                      objKey={["serial_number", "country"]}
                      multiple={true}
                      loadMsg={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? "Loading..."
                          : "Please Select Equipment Prep and Equip Return Date First"
                      }
                    />

                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "calibrationOrific",
                          value: val,
                        })
                      }
                      isNeed={props.isEdit}
                      separator="&"
                      isEdit={props.isEdit}
                      idVals={formData.calibrationOrificId}
                      isEditLoading={EditDataLoading}
                      paramId={props.proId}
                      paramName="proid"
                      groupClass="mb-3 col-md-6 selectbox"
                      groupId="formGroupCalibrationOrific"
                      label="Calibration Orifice"
                      value={formData.calibrationOrific}
                      onSelect={addedSelectVal.bind(
                        null,
                        "calibrationOrific",
                        "calibrationOrificId",
                        false
                      )}
                      name="CalibrationOrific"
                      url={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? `/get/calibrationorifice?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      isSearch={true}
                      objKey={["serial_number", "country"]}
                      multiple={true}
                      loadMsg={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? "Loading..."
                          : "Please Select Equipment Prep and Equip Return Date First"
                      }
                    />
                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "swabMasterTsr",
                          value: val,
                        })
                      }
                      isNeed={props.isEdit}
                      separator="&"
                      isEdit={props.isEdit}
                      idVals={formData.swabMasterTsrId}
                      isEditLoading={EditDataLoading}
                      paramId={props.proId}
                      paramName="proid"
                      groupClass="mb-3 col-md-6 selectbox"
                      groupId="formGroupSwabMaster"
                      label="Swab Master TSR"
                      value={formData.swabMasterTsr}
                      onSelect={addedSelectVal.bind(
                        null,
                        "swabMasterTsr",
                        "swabMasterTsrId",
                        false
                      )}
                      name="SwabMaster"
                      url={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? `/get/swabmaster?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      isSearch={true}
                      objKey={["serial_number", "country"]}
                      multiple={true}
                      loadMsg={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? "Loading..."
                          : "Please Select Equipment Prep and Equip Return Date First"
                      }
                    />

                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "deviceHose",
                          value: val,
                        })
                      }
                      isNeed={props.isEdit}
                      separator="&"
                      isEdit={props.isEdit}
                      idVals={formData.deviceHoseId}
                      isEditLoading={EditDataLoading}
                      paramId={props.proId}
                      paramName="proid"
                      groupClass="mb-3 col-md-6 selectbox"
                      groupId="formGroupDeviceHose"
                      label="Device Hose"
                      value={formData.deviceHose}
                      onChange={selectionBoxChanged.bind(null, "deviceHose")}
                      onSelect={addedSelectVal.bind(
                        null,
                        "deviceHose",
                        "deviceHoseId",
                        false
                      )}
                      name="devicehose"
                      url={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? `/get/devicehose?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      isSearch={true}
                      objKey={["serial_number", "country"]}
                      multiple={true}
                      loadMsg={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? "Loading..."
                          : "Please Select Equipment Prep and Equip Return Date First"
                      }
                    />
                    <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "airHose",
                          value: val,
                        })
                      }
                      isNeed={props.isEdit}
                      separator="&"
                      isEdit={props.isEdit}
                      idVals={formData.airHoseId}
                      paramId={props.proId}
                      paramName="proid"
                      isEditLoading={EditDataLoading}
                      groupClass="mb-3 col-md-6 selectbox"
                      groupId="formGroupAirHose"
                      label="Air Hose"
                      value={formData.airHose}
                      onSelect={addedSelectVal.bind(
                        null,
                        "airHose",
                        "airHoseId",
                        false
                      )}
                      name="airhose"
                      url={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? `/get/airhose?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                          : ""
                      }
                      isSearch={true}
                      objKey={["serial_number", "country"]}
                      multiple={true}
                      loadMsg={
                        formData.equipPrepDate && formData.equipDeliverTM
                          ? "Loading..."
                          : "Please Select Equipment Prep and Equip Return Date First"
                      }
                    />
                  </div>
                </Tab>
              </Tabs>
              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={formStatus.isSubmitting}
                >
                  {formStatus.submitBtnVal}
                </Button>
              </div>
            </Form>
            {formStatus.isError ? (
              <p className="dangour">{formStatus.errMsg}</p>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </div>
      <Search />
    </>
  );
}

export default ProjectForm;
