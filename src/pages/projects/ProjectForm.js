import React, { useEffect, useReducer, useState } from "react";
import { Card, Form, Tabs, Tab, Button, Row, Col, Nav } from "react-bootstrap";
import SelectionBox from "../../components/UI/Form/SelectionBox";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/uiStore";
// import Multiselect from "multiselect-react-dropdown";
import SingleSelection from "../../components/UI/Form/SingleSelection";
import SelectSearch from "react-select-search";
import Search from "../Search";
import DragNDrop from "../../components/projects/DragNDrop";

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
  allEquip: [],
  allParts: [],
};

const reducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const ProjectForm = (props) => {
  const [key, setKey] = useState(0);
  const [warehouseData, setWarehouseData] = useState([]);
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

  // to get all data for edited thing
  const getEqnuipPartMainData = function (data, type, showName) {
    if (!data?.length) return [];
    return data.map((data) => {
      return {
        id: data.id,
        name: `${data.alternate_name} - ${data.serial_number} - ${data.pm_status} - ${data.country}`,
        type,
        showName,
      };
    });
  };

  const getEqnuipPartIds = function (data) {
    if (!data?.length) return [];
    return data.map((data) => data.id);
  };

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
    console.log(response);
    if (response?.status !== 200) return;
    const allTtds = getEqnuipPartMainData(response.data?.ttd, "ttd", "TTD");
    const allTtdId = getEqnuipPartIds(allTtds);
    const allBdds = getEqnuipPartMainData(response.data?.bdd, "bdd", "BDD");
    const allBddsId = getEqnuipPartIds(allBdds);
    const allCalibrationStand = getEqnuipPartMainData(
      response.data?.calibration_stand,
      "calibrationStand",
      "Calibration Stand"
    );
    const allCalibrationStandId = getEqnuipPartIds(allCalibrationStand);
    const allSupplyOrific = getEqnuipPartMainData(
      response.data?.supply_orifice_part,
      "supplyOrific",
      "Supply Orifice"
    );
    const allSupplyOrificId = getEqnuipPartIds(allSupplyOrific);
    const allAssignedPart = getEqnuipPartMainData(
      response.data?.part,
      "assignedPart",
      "General Part"
    );
    const allAssignedPartId = getEqnuipPartIds(allAssignedPart);
    const allPressureSensor = getEqnuipPartMainData(
      response.data?.pressure_sensor_part,
      "pressureSensor",
      "Pressure Sensor"
    );
    const allPressureSensorId = getEqnuipPartIds(allPressureSensor);
    const allCalibrationOrific = getEqnuipPartMainData(
      response.data?.calibration_orifice_part,
      "calibrationOrific",
      "Calibration Orific"
    );
    const allCalibrationOrificId = getEqnuipPartIds(allCalibrationOrific);
    const allSwabMasterTsr = getEqnuipPartMainData(
      response.data?.swabmaster_part,
      "swabMasterTsr",
      "Swab Master TSR"
    );
    const allSwabMasterTsrId = getEqnuipPartIds(allSwabMasterTsr);
    const allDeviceHose = getEqnuipPartMainData(
      response.data?.device_part,
      "deviceHose",
      "Device hose"
    );
    const allDeviceHoseId = getEqnuipPartIds(allDeviceHose);
    const allAirHose = getEqnuipPartMainData(
      response.data?.airhose_part,
      "airHose",
      "Air hose"
    );
    const allAirHoseId = getEqnuipPartIds(allAirHose);
    const allSwabMaster = getEqnuipPartMainData(
      response.data?.swabmaster_equip,
      "swabMaster",
      "Swab Master"
    );
    const allSwabMasterId = getEqnuipPartIds(allSwabMaster);
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
        ttd: allTtds,
        ttdId: allTtdId,
        bdd: allBdds,
        bddId: allBddsId,
        calibrationStand: allCalibrationStand,
        calibrationStandId: allCalibrationStandId,
        assignedPart: allAssignedPart,
        assignedPartId: allAssignedPartId,
        supplyOrific: allSupplyOrific,
        supplyOrificId: allSupplyOrificId,
        pressureSensor: allPressureSensor,
        pressureSensorId: allPressureSensorId,
        calibrationOrific: allCalibrationOrific,
        calibrationOrificId: allCalibrationOrificId,
        swabMasterTsr: allSwabMasterTsr,
        swabMasterTsrId: allSwabMasterTsrId,
        deviceHose: allDeviceHose,
        deviceHoseId: allDeviceHoseId,
        airHose: allAirHose,
        airHoseId: allAirHoseId,
        swabMaster: allSwabMaster,
        swabMasterId: allSwabMasterId,
      },
    });
    setEditDataLoading(true);
    // setLoadError({ isLoading: false, isError: false, isSubmitting: false });
  };

  const getWarehouseData = async function (url, objKey) {
    const response = await ajaxCall(
      url,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: "GET",
      },
      8000
    );
    const allObj = response.data.map((option) => {
      let name = "";
      objKey.forEach((key, index, arr) => {
        if (index !== 0) name += " - ";
        name += option[key];
      });
      return { value: option.id, name };
    });
    setWarehouseData(allObj);
  };
  // get data if it's edit project
  useEffect(() => {
    getWarehouseData(`/get/option/warehouse/`, [
      "warehouse_name",
      "warehouse_location",
    ]);
    if (props.isEdit) {
      getEditProjectData();
    }
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
    appendData("calibration_orifice_part", formData.calibrationOrificId, data);
    appendData("device_part", formData.deviceHoseId, data);
    appendData("airhose_part", formData.airHoseId, data);
    appendData("swabmaster_equip", formData.swabMasterId, data);
    appendData("part", formData.assignedPartId, data);
    return data;
  };

  // const selectionBoxChanged = (fieldName, proFieldName, val) => {
  //   if (isSingle) {
  //     dispatchInputChange({
  //       type: proFieldName,
  //       value: val.id,
  //     });
  //     dispatchInputChange({
  //       type: fieldName,
  //       value: val,
  //     });
  //     return;
  //   }
  //   console.log(val);
  //   dispatchInputChange({
  //     type: fieldName,
  //     value: val,
  //   });
  // };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchInputChange({
        type: fieldName,
        value: val,
      });
      dispatchInputChange({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    console.log("arg is", val);
    console.log("New val is", newValIds);
    dispatchInputChange({
      type: fieldName,
      value: val,
    });
    dispatchInputChange({
      type: proFieldName,
      value: newValIds,
    });
  };
  const dropVals = (
    fieldName,
    proFieldName,
    isSingle,
    isRemove = false,
    val,
    ep,
    epID
  ) => {
    let allVals, allIdVals, types, typeIds;
    if (isRemove) {
      allVals = formData[ep].filter((data) => data.id !== val);
      types = ep;
      typeIds = epID;
    } else {
      if (!formData[fieldName].find((element) => element.id === val.id)) {
        allVals = [...formData[fieldName], val];
      } else {
        allVals = formData[fieldName];
      }
      types = fieldName;
      typeIds = proFieldName;
    }
    allIdVals = allVals.map((ids) => +ids.id);
    dispatchInputChange({
      type: types,
      value: allVals,
    });
    dispatchInputChange({
      type: typeIds,
      value: allIdVals,
    });
  };

  const processFormData = async (e) => {
    e.preventDefault();
    if (!formData.projectName?.length) {
      setFormStatus((formData) => ({
        ...formData,
        isError: true,
        errMsg: "Please write project name",
      }));
      setKey(0);
      return;
    }
    if (!formData.scopeOfWorkId?.length) {
      setFormStatus((formData) => ({
        ...formData,
        isError: true,
        errMsg: "Please Select Scope of Work",
      }));
      setKey(1);
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

    console.log(JSON.stringify(data));
    // lets submit data and log the response
    let url = "/createproject/";
    let method = "POST";
    if (props.isEdit) {
      url = `/update/project/${props.proId}/`;
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

    console.log(response);
  }; // forward is true by default, for forward and backword function is same
  const tabChange = function (isForward = true) {
    console.log("key is", key);
    if (isForward) {
      setKey(key === 4 ? 0 : key + 1);
      return;
    }
    setKey(key === 0 ? 2 : key - 1);
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
                onSelect={(k) => setKey(+k)}
                className="mb-3"
              >
                <Tab eventKey={0} title="Project Info">
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
                        disabled={!formData.equipPrepDate}
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
                      separator="&"
                      isNeed={props.isEdit}
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
                <Tab eventKey={1} title="General">
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
                <Tab eventKey={2} title="Critical Dates">
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
                        disabled={!formData.equipDeliverTM}
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
                        disabled={!formData.equipReadyDate}
                        min={formData.equipReadyDate}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipDeliveryClientDate"
                    >
                      <Form.Label>Equipment Receiving Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipDeliveryClientDate}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipDeliveryClientDate",
                            value: e.target.value,
                          })
                        }
                        disabled={!formData.equipShipClientDate}
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
                        disabled={!formData.equipDeliveryClientDate}
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
                        disabled={!formData.projectStart}
                        min={formData.projectStart}
                        max={formData.equipDeliverTM}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-6"
                      controlId="formGroupEquipReturnClient"
                    >
                      <Form.Label>Equipment return to warehouse</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.equipReturnClient}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "equipReturnClient",
                            value: e.target.value,
                          })
                        }
                        disabled={!formData.projectEnd}
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
                <Tab eventKey={3} title="Assign Equipments">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="ttd">
                    <Row>
                      <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="ttd">TTD</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="bdd">BDD</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="calibrationStand">
                              Calibration stand
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="swabMaster">
                              Swab Master
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={10}>
                        <Tab.Content>
                          <Tab.Pane eventKey="ttd">
                            <DragNDrop
                              title="All Equipments"
                              selectedVals={[]}
                              idVals={formData.ttdId}
                              value={formData.ttd}
                              url={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? `/get/new/ttd/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                  : ""
                              }
                              objKey={[
                                "alternate_name",
                                "serial_number",
                                "pm_status",
                                ["location_for_warehouse", "warehouse_name"],
                              ]}
                              loadMsg={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? "Loading..."
                                  : "Please Select Equipment Prep and Equip Return Date First"
                              }
                              onSelect={dropVals.bind(
                                null,
                                "ttd",
                                "ttdId",
                                false,
                                false
                              )}
                              onRemove={dropVals.bind(
                                null,
                                "ttd",
                                "ttdId",
                                false,
                                true
                              )}
                              isNeed={props.isEdit}
                              separator="&"
                              paramId={props.proId}
                              paramName="proid"
                              allEP={[
                                ...formData.ttd,
                                ...formData.bdd,
                                ...formData.calibrationStand,
                                ...formData.swabMaster,
                              ]}
                              epName="ttd"
                              showName="TTD"
                              warehouseData={warehouseData}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="bdd">
                            <DragNDrop
                              title="All Equipments"
                              selectedVals={[]}
                              idVals={formData.bddId}
                              value={formData.bdd}
                              url={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? `/get/new/bdd/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                  : ""
                              }
                              objKey={[
                                "alternate_name",
                                "serial_number",
                                "pm_status",
                                ["location_for_warehouse", "warehouse_name"],
                              ]}
                              loadMsg={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? "Loading..."
                                  : "Please Select Equipment Prep and Equip Return Date First"
                              }
                              onSelect={dropVals.bind(
                                null,
                                "bdd",
                                "bddId",
                                false,
                                false
                              )}
                              onRemove={dropVals.bind(
                                null,
                                "bdd",
                                "bddId",
                                false,
                                true
                              )}
                              isNeed={props.isEdit}
                              separator="&"
                              paramId={props.proId}
                              paramName="proid"
                              allEP={[
                                ...formData.ttd,
                                ...formData.bdd,
                                ...formData.calibrationStand,
                                ...formData.swabMaster,
                              ]}
                              epName="bdd"
                              showName="BDD"
                              warehouseData={warehouseData}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="calibrationStand">
                            <DragNDrop
                              title="All Equipments"
                              selectedVals={[]}
                              idVals={formData.calibrationStand}
                              value={formData.calibrationStand}
                              url={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? `/get/new/calibrationstand/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                  : ""
                              }
                              objKey={[
                                "alternate_name",
                                "serial_number",
                                "pm_status",
                                ["location_for_warehouse", "warehouse_name"],
                              ]}
                              loadMsg={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? "Loading..."
                                  : "Please Select Equipment Prep and Equip Return Date First"
                              }
                              onSelect={dropVals.bind(
                                null,
                                "calibrationStand",
                                "calibrationStandId",
                                false,
                                false
                              )}
                              onRemove={dropVals.bind(
                                null,
                                "calibrationStand",
                                "calibrationStandId",
                                false,
                                true
                              )}
                              isNeed={props.isEdit}
                              separator="&"
                              paramId={props.proId}
                              paramName="proid"
                              allEP={[
                                ...formData.ttd,
                                ...formData.bdd,
                                ...formData.calibrationStand,
                                ...formData.swabMaster,
                              ]}
                              epName="calibrationStand"
                              showName="Calibration Stand"
                              warehouseData={warehouseData}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="swabMaster">
                            <DragNDrop
                              title="All Equipments"
                              selectedVals={[]}
                              idVals={formData.swabMasterId}
                              value={formData.swabMaster}
                              url={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? `/get/new/swabmaster/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                  : ""
                              }
                              objKey={[
                                "alternate_name",
                                "serial_number",
                                "pm_status",
                                ["location_for_warehouse", "warehouse_name"],
                              ]}
                              loadMsg={
                                formData.equipPrepDate &&
                                formData.equipDeliverTM
                                  ? "Loading..."
                                  : "Please Select Equipment Prep and Equip Return Date First"
                              }
                              onSelect={dropVals.bind(
                                null,
                                "swabMaster",
                                "swabMasterId",
                                false,
                                false
                              )}
                              onRemove={dropVals.bind(
                                null,
                                "swabMaster",
                                "swabMasterId",
                                false,
                                true
                              )}
                              isNeed={props.isEdit}
                              separator="&"
                              paramId={props.proId}
                              paramName="proid"
                              allEP={[
                                ...formData.ttd,
                                ...formData.bdd,
                                ...formData.calibrationStand,
                                ...formData.swabMaster,
                              ]}
                              epName="swabMaster"
                              showName="Swab Master"
                              warehouseData={warehouseData}
                            />
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Tab>
                <Tab eventKey={4} title="Assign Parts">
                  <div className="row">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="allGp"
                    >
                      <Row>
                        <Col sm={2}>
                          <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                              <Nav.Link eventKey="allGp">
                                All General Part
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="airHose">Air Hose</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="calibrationOrifice">
                                Calibration Orifice
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="deviceHose">
                                Device Hose
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={10}>
                          <Tab.Content>
                            <Tab.Pane eventKey="allGp">
                              <DragNDrop
                                title="All Part"
                                selectedVals={[]}
                                idVals={formData.assignedPartId}
                                value={formData.assignedPart}
                                url={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? `/get/new/parts/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                    : ""
                                }
                                objKey={[
                                  "part_name",
                                  "serial_number",
                                  ["location_for_warehouse", "warehouse_name"],
                                ]}
                                loadMsg={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? "Loading..."
                                    : "Please Select Equipment Prep and Equip Return Date First"
                                }
                                onSelect={dropVals.bind(
                                  null,
                                  "assignedPart",
                                  "assignedPartId",
                                  false,
                                  false
                                )}
                                onRemove={dropVals.bind(
                                  null,
                                  "assignedPart",
                                  "assignedPartId",
                                  false,
                                  true
                                )}
                                isNeed={props.isEdit}
                                separator="&"
                                paramId={props.proId}
                                paramName="proid"
                                allEP={[
                                  ...formData.assignedPart,
                                  ...formData.airHose,
                                  ...formData.calibrationOrific,
                                  ...formData.deviceHose,
                                  ...formData.pressureSensor,
                                  ...formData.supplyOrific,
                                  ...formData.swabMasterTsr,
                                ]}
                                epName="assignedPart"
                                showName="General Part"
                                warehouseData={warehouseData}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey="airHose">
                              <DragNDrop
                                title="All Part"
                                selectedVals={[]}
                                idVals={formData.airHoseId}
                                value={formData.airHose}
                                url={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? `/get/new/airhose/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                    : ""
                                }
                                objKey={[
                                  "serial_number",
                                  ["warehouse", "warehouse_name"],
                                ]}
                                loadMsg={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? "Loading..."
                                    : "Please Select Equipment Prep and Equip Return Date First"
                                }
                                onSelect={dropVals.bind(
                                  null,
                                  "airHose",
                                  "airHoseId",
                                  false,
                                  false
                                )}
                                onRemove={dropVals.bind(
                                  null,
                                  "airHose",
                                  "airHoseId",
                                  false,
                                  true
                                )}
                                isNeed={props.isEdit}
                                separator="&"
                                paramId={props.proId}
                                paramName="proid"
                                allEP={[
                                  ...formData.assignedPart,
                                  ...formData.airHose,
                                  ...formData.calibrationOrific,
                                  ...formData.deviceHose,
                                  ...formData.pressureSensor,
                                  ...formData.supplyOrific,
                                  ...formData.swabMasterTsr,
                                ]}
                                epName="airHose"
                                showName="Air hose"
                                warehouseData={warehouseData}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey="calibrationOrifice">
                              <DragNDrop
                                title="All Part"
                                selectedVals={[]}
                                idVals={formData.calibrationOrificId}
                                value={formData.calibrationOrific}
                                url={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? `/get/new/calibration-orifice/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                    : ""
                                }
                                objKey={[
                                  "serial_number",
                                  ["location_for_warehouse", "warehouse_name"],
                                ]}
                                loadMsg={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? "Loading..."
                                    : "Please Select Equipment Prep and Equip Return Date First"
                                }
                                onSelect={dropVals.bind(
                                  null,
                                  "calibrationOrific",
                                  "calibrationOrificId",
                                  false,
                                  false
                                )}
                                onRemove={dropVals.bind(
                                  null,
                                  "calibrationOrific",
                                  "calibrationOrificId",
                                  false,
                                  true
                                )}
                                isNeed={props.isEdit}
                                separator="&"
                                paramId={props.proId}
                                paramName="proid"
                                allEP={[
                                  ...formData.assignedPart,
                                  ...formData.airHose,
                                  ...formData.calibrationOrific,
                                  ...formData.deviceHose,
                                  ...formData.pressureSensor,
                                  ...formData.supplyOrific,
                                  ...formData.swabMasterTsr,
                                ]}
                                epName="calibrationOrific"
                                showName="Calibration Orific"
                                warehouseData={warehouseData}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey="deviceHose">
                              <DragNDrop
                                title="All Part"
                                selectedVals={[]}
                                idVals={formData.deviceHoseId}
                                value={formData.deviceHose}
                                url={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? `/get/new/devicehose/?start_date=${formData.equipPrepDate}&end_date=${formData.equipDeliverTM}`
                                    : ""
                                }
                                objKey={[
                                  "serial_number",
                                  ["warehouse", "warehouse_name"],
                                ]}
                                loadMsg={
                                  formData.equipPrepDate &&
                                  formData.equipDeliverTM
                                    ? "Loading..."
                                    : "Please Select Equipment Prep and Equip Return Date First"
                                }
                                onSelect={dropVals.bind(
                                  null,
                                  "deviceHose",
                                  "deviceHoseId",
                                  false,
                                  false
                                )}
                                onRemove={dropVals.bind(
                                  null,
                                  "deviceHose",
                                  "deviceHoseId",
                                  false,
                                  true
                                )}
                                isNeed={props.isEdit}
                                separator="&"
                                paramId={props.proId}
                                paramName="proid"
                                allEP={[
                                  ...formData.assignedPart,
                                  ...formData.airHose,
                                  ...formData.calibrationOrific,
                                  ...formData.deviceHose,
                                  ...formData.pressureSensor,
                                  ...formData.supplyOrific,
                                  ...formData.swabMasterTsr,
                                ]}
                                epName="deviceHose"
                                showName="Device hose"
                                warehouseData={warehouseData}
                              />
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                </Tab>
              </Tabs>

              <div className="col-md-12 flexCenter gap10">
                {key === 0 ? (
                  " "
                ) : (
                  <Button
                    type="button"
                    className=""
                    onClick={tabChange.bind(null, false)}
                  >
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  </Button>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={formStatus.isSubmitting}
                >
                  {formStatus.submitBtnVal}
                </Button>{" "}
                {key === 4 ? (
                  ""
                ) : (
                  <Button type="button" className="" onClick={tabChange}>
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </Button>
                )}
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
};

export default ProjectForm;
