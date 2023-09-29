import React, { useEffect, useReducer, useState } from "react";
import { Card, Form, Tabs, Tab, Button } from "react-bootstrap";
// import SelectionBox from "../UI/Form/SelectionBox";
// import Multiselect from "multiselect-react-dropdown";
import SelectSearch from "react-select-search";
import FileUpload from "../UI/Form/FileUpload";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/uiStore";
import LoadingData from "../UI/LoadingData";
import { Link, useLocation } from "react-router-dom";
import SingleSelection from "../UI/Form/SingleSelection";
import EquipPartModal from "../EquipPartModal";

const initialState = {
  location_for_warehouse: null,
  location_for_warehouseName: "",
  location_for_storage: "",
  packaging: "",
  is_this_part_of_set: "NO",
  if_yes_how_many_in_a_set: "",
  alternate_name: "",
  abbreviation: "",
  serial_number: "",
  asset_number: "",
  pm_status: "",
  frame: "",
  image: "",
  remarks: "",
  supply_orifice_set: null,
  supply_orifice_setName: "",
  pressure_sensor: null,
  pressure_sensorName: "",
  TTD_tube_seal_rack: null,
  TTD_tube_seal_rackName: "",
  isEdit: false,
  projectId: "",
};

const reducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.reset) {
    return initialState;
  }
  if (action?.type === "update") {
    console.log(action.data);
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const TTDForm = (props) => {
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [EditDataLoading, setEditDataLoading] = useState(false);
  const [formData, dispatchInputChange] = useReducer(reducer, initialState);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const authData = useSelector((state) => state.authStore);
  const dispatch = useDispatch();

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
  const handleChange = (fileName, file) => {
    // console.log(fileName, file);
    dispatchInputChange({ type: fileName, value: file });
  };

  const appendData = function (data, field, value) {
    // if (field === "image" && value instanceof File) data.append(field, value);
    // else if (field !== "image") data.append(field, value);
    if (field === "image" && value instanceof File) data.append(field, value);
    else if (field !== "image" && value) data.append(field, value);
    else if (field !== "image") data.append(field, "");
  };
  const getformData = function () {
    const data = new FormData();
    appendData(data, "location_for_warehouse", formData.location_for_warehouse);
    appendData(data, "location_for_storage", formData.location_for_storage);
    appendData(data, "packaging", formData.packaging);
    appendData(data, "is_this_part_of_set", formData.is_this_part_of_set);
    appendData(
      data,
      "if_yes_how_many_in_a_set",
      formData.if_yes_how_many_in_a_set
    );
    appendData(data, "alternate_name", formData.alternate_name);
    appendData(data, "abbreviation", formData.abbreviation);
    appendData(data, "serial_number", formData.serial_number);
    appendData(data, "asset_number", formData.asset_number);
    appendData(data, "pm_status", formData.pm_status);
    appendData(data, "frame", formData.frame);
    appendData(data, "image", formData.image);
    appendData(data, "remarks", formData.remarks);
    appendData(data, "supply_orifice_set", formData.supply_orifice_set);
    appendData(data, "pressure_sensor", formData.pressure_sensor);
    appendData(data, "TTD_tube_seal_rack", formData.TTD_tube_seal_rack);
    // data.append("supply_orifice_set", "");
    // data.append("pressure_sensor", formData.pressure_sensor);
    // data.append("TTD_tube_seal_rack", formData.TTD_tube_seal_rack);
    return data;
  };

  const validateForm = function () {
    if (!formData.location_for_warehouse) {
      setFormStatus((formStatus) => {
        return {
          ...formStatus,
          isError: true,
          errMsg: "Please select Warehouse",
          isSubmitting: false,
        };
      });
      return false;
    }
    if (!formData.location_for_storage) {
      setFormStatus((formStatus) => {
        return {
          ...formStatus,
          isError: true,
          errMsg: "Please Write Warehouse Storage",
          isSubmitting: false,
        };
      });
      return false;
    }
    if (!formData.serial_number) {
      setFormStatus((formStatus) => {
        return {
          ...formStatus,
          isError: true,
          errMsg: "Please Write Serial Number",
          isSubmitting: false,
        };
      });
      return false;
    }
    return true;
  };

  const sendData = async function (e) {
    e.preventDefault();
    setFormStatus((formStatus) => {
      return {
        ...formStatus,
        isError: false,
        errMsg: null,
        isSubmitting: true,
      };
    });
    // console.log(formData);
    let url, method;
    if (props.data.isEdit) {
      url = `/eq/ttdretupddel/${props.editId}/`;
      method = "PATCH";
    } else {
      url = "/eq/createttd/";
      method = "POST";
    }
    const sendingData = getformData();
    const response = await ajaxCall(
      url,
      {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method,
        body: sendingData,
        // signal,
      },
      8000
      // timeoutfun
    );
    // console.log(response);
    setFormStatus(initialSubmit);
    setIsShowPopup(false);
    if (response.status === 201) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "TTD",
          msg: `TTD ${formData.alternate_name} Added Successfully`,
        })
      );
      dispatchInputChange({ reset: true });
    } else if (response.status === 200) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "TTD",
          msg: `TTD ${formData.alternate_name} Edited Successfully`,
        })
      );
      dispatchInputChange({ reset: true });
    } else if (response.status === 400) {
      setFormStatus((formStatus) => {
        return {
          ...formStatus,
          isError: true,
          errMsg: "Serial Number should be unique, Please check all fields.",
          isSubmitting: false,
        };
      });
    } else {
      setFormStatus((formStatus) => {
        return {
          ...formStatus,
          isError: true,
          errMsg: "Some Problem occur please try again !",
          isSubmitting: false,
        };
      });
    }
    props.refresh();
    props.cancelEdit();
  };

  const cancelEdit = function () {
    dispatchInputChange({ reset: true });
    setFormStatus(initialSubmit);
    props.cancelEdit();
  };

  const getTTDData = async function () {
    setIsLoading(true);
    // console.log("it's", props.editId);
    const response = await ajaxCall(
      `/eq/ttdretupddel/${props.editId}/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
      },
      8000
      // timeoutfun
    );
    console.log(response);
    setIsLoading(false);
    if (response?.status !== 200) return;
    dispatchInputChange({
      type: "update",
      data: {
        ...response.data,
        location_for_warehouse: response.data?.location_for_warehouse,
        location_for_storage: response.data?.location_for_storage,
        packaging: response.data?.packaging,
        is_this_part_of_set: response.data?.is_this_part_of_set
          ? response.data?.is_this_part_of_set
          : "NO",
        if_yes_how_many_in_a_set: response.data?.if_yes_how_many_in_a_set,
        alternate_name: response.data?.alternate_name,
        abbreviation: response.data?.abbreviation,
        serial_number: response.data?.serial_number,
        asset_number: response.data?.asset_number,
        pm_status: response.data?.pm_status,
        frame: response.data?.frame,
        image: response.data?.image,
        remarks: response.data?.remarks,
        supply_orifice_set: response.data?.supply_orifice_set,
        pressure_sensor: response.data?.pressure_sensor,
        TTD_tube_seal_rack: response.data?.TTD_tube_seal_rack,
        isEdit: response.data?.status,
        projectId: response.data?.project_ids,
      },
    });
    setEditDataLoading(true);
  };
  // if it's edit then let's do it
  useEffect(() => {
    // console.log("is edit is", props.data.isEdit);
    if (props.data.isEdit && props.editId) {
      getTTDData();
    } else {
      dispatchInputChange({ reset: true });
    }
  }, [props.data, props.editId]);

  useEffect(() => {
    if (props.isWhEdit) {
      dispatchInputChange({
        type: "location_for_warehouse",
        value: props.whId,
      });
    }
  }, [props.isWhEdit]);

  const location = useLocation();
  useEffect(() => {
    setKey(0);
  }, [location]);

  // forward is true by default, for forward and backword function is same
  const tabChange = function (isForward = true) {
    // console.log("key is", key);
    if (isForward) {
      setKey(key === 2 ? 0 : key + 1);
      return;
    }
    setKey(key === 0 ? 2 : key - 1);
  };

  const showPrompt = function () {
    if (validateForm()) {
      setIsShowPopup(true);
    }
  };

  return (
    <>
      <Card className="col-md-12 flexCenter">
        <Card.Body>
          <div className="row ">
            <Card.Title className="mb-3 text-center">
              {props.data.title}
            </Card.Title>
            {props.data.isEdit && isLoading ? (
              <LoadingData className="loading-spinner-flex" />
            ) : (
              <Form onSubmit={showPrompt}>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => {
                    setKey(+k);
                  }}
                  className="mb-3"
                >
                  <Tab eventKey={0} title="Warehouse">
                    <div className="row customRow">
                      {props?.isWhEdit ? (
                        ""
                      ) : (
                        <SingleSelection
                          groupClass="mb-3 selectbox col-md-6"
                          groupId="formGroupUnitName"
                          label="Warehouse"
                          isNeed={false}
                          separator="?"
                          paramId={props.editId}
                          paramName="ttd_id"
                          value={formData.location_for_warehouse}
                          onChange={(val, allData) => {
                            dispatchInputChange({
                              type: "location_for_warehouse",
                              value: val,
                            });
                          }}
                          isSearch={true}
                          objKey={["warehouse_name", "warehouse_location"]}
                          url={`/get/option/warehouse/`}
                          forPopup={true}
                          setPopupthing={(value) => {
                            dispatchInputChange({
                              type: "location_for_warehouseName",
                              value,
                            });
                          }}
                        />
                      )}

                      {/* <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "wareHouse",
                          value: val,
                        })
                      }
                      isEdit={props.data.isEdit}
                      isNeed={false}
                      separator="?"
                      paramId={props.editId}
                      paramName="ttd_id"
                      isEditLoading={EditDataLoading}
                      idVals={formData.location_for_warehouse}
                      // proId={props.proId}
                      groupClass="mb-3 selectbox col-md-6"
                      groupId="formGroupUnitName"
                      label="Warehouse"
                      value={formData.wareHouse}
                      onSelect={addedSelectVal.bind(
                        null,
                        "wareHouse",
                        "location_for_warehouse",
                        true
                      )}
                      name="warehouse"
                      url={`/get/option/warehouse/`}
                      isSearch={true}
                      objKey={["warehouse_name", "warehouse_location"]}
                      multiple={false}
                      loadMsg={"Loading..."}
                    /> */}
                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupProName"
                      >
                        <Form.Label>Warehouse Storage</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.location_for_storage}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "location_for_storage",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupProName"
                      >
                        <Form.Label>Packaging</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.packaging}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "packaging",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className={`col-md-6 selectionBox mb-3`}
                        controlId={props.groupId}
                      >
                        <Form.Label className="text-center itsBlock">
                          Is This Part Of Set
                        </Form.Label>
                        <SelectSearch
                          options={[
                            { name: "No", value: "NO" },
                            { name: "Yes", value: "YES" },
                          ]}
                          placeholder="Choose from options"
                          value={formData.is_this_part_of_set}
                          onChange={(val) => {
                            dispatchInputChange({
                              type: "is_this_part_of_set",
                              value: val,
                            });
                          }}
                          name="partOfSet"
                        />
                      </Form.Group>
                      {formData.is_this_part_of_set === "YES" ? (
                        <Form.Group
                          className="mb-3 col-md-6"
                          controlId="formGroupProName"
                        >
                          <Form.Label>How Many In Set</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.if_yes_how_many_in_a_set}
                            onChange={(e) =>
                              dispatchInputChange({
                                type: "if_yes_how_many_in_a_set",
                                value: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      ) : (
                        ""
                      )}
                    </div>
                  </Tab>
                  <Tab eventKey={1} title="TTD Info">
                    <div className="row">
                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupRemark"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.alternate_name}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "alternate_name",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupisSubThenClient"
                      >
                        <Form.Label>Abbreviation</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.abbreviation}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "abbreviation",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupRemark"
                      >
                        <Form.Label>Serial Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.serial_number}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "serial_number",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupRemark"
                      >
                        <Form.Label>Asset Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.asset_number}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "asset_number",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="pm_status"
                      >
                        <Form.Label>PM Status</Form.Label>
                        <SelectSearch
                          options={[
                            { name: "Red", value: "RED" },
                            { name: "Blue", value: "BLUE" },
                            { name: "Green", value: "GREEN" },
                          ]}
                          placeholder="Choose from options"
                          value={formData.pm_status}
                          onChange={(val) => {
                            dispatchInputChange({
                              type: "pm_status",
                              value: val,
                            });
                          }}
                          name="pm_status"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupRemark"
                      >
                        <Form.Label>Frame</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.frame}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "frame",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="formGroupRemark"
                      >
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.remarks}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "remarks",
                              value: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <div className="col-md-12">
                        <FileUpload
                          appId={props.appId}
                          uploadId="image"
                          isEdit={props.edit}
                          onChange={handleChange.bind(null, "image")}
                          groupId="image"
                          groupClassName="mb-3 col-md-6 dragDropUpload"
                          label="Image"
                          fieldName="image"
                          minUploadSize="0.005"
                          maxUploadSize="10"
                          afile={formData.image}
                        />
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={2} title="Specification">
                    <div className="row">
                      <SingleSelection
                        groupClass="mb-3 col-md-6 selectbox"
                        groupId="formGroupSOS"
                        label="Supply Orifice Set"
                        isNeed={props.data.isEdit}
                        separator="?"
                        paramId={props.editId}
                        paramName="ttd_id"
                        value={formData.supply_orifice_set}
                        onChange={(val, allData) => {
                          dispatchInputChange({
                            type: "supply_orifice_set",
                            value: val,
                          });
                        }}
                        isSearch={true}
                        url={
                          props.isWhEdit
                            ? `/get/option/supplyorificepart/?warehouse_id=${props.whId}`
                            : `/get/option/supplyorificepart/${
                                formData.location_for_warehouse
                                  ? `?wilocation_for_warehoused=${formData.location_for_warehouse}`
                                  : ""
                              }`
                        }
                        name="supplyorificeset"
                        objKey={[
                          "serial_number",
                          "part_name",
                          "pm_status",
                          "location_for_warehouse",
                        ]}
                        forPopup={true}
                        setPopupthing={(value) => {
                          dispatchInputChange({
                            type: "supply_orifice_setName",
                            value,
                          });
                        }}
                      />

                      <SingleSelection
                        groupClass="mb-3 selectbox col-md-6"
                        groupId="formGroupReactor"
                        label="Pressure Sensor"
                        isNeed={props.data.isEdit}
                        separator="?"
                        paramId={props.editId}
                        paramName="ttd_id"
                        value={formData.pressure_sensor}
                        onChange={(val, allValue) => {
                          dispatchInputChange({
                            type: "pressure_sensor",
                            value: val,
                          });
                        }}
                        isSearch={true}
                        url={
                          props.isWhEdit
                            ? `/get/option/pressuresensorpart/?warehouse_id=${props.whId}`
                            : `/get/option/pressuresensorpart/${
                                formData.location_for_warehouse
                                  ? `?wilocation_for_warehoused=${formData.location_for_warehouse}`
                                  : ""
                              }`
                        }
                        name="pressureSensorPart"
                        objKey={[
                          "serial_number",
                          "part_name",
                          "pm_status",
                          "range",
                          "location_for_warehouse",
                        ]}
                        forPopup={true}
                        setPopupthing={(value) => {
                          dispatchInputChange({
                            type: "pressure_sensorName",
                            value,
                          });
                        }}
                      />

                      {/* <SelectionBox
                      onEditchange={(val) =>
                        dispatchInputChange({
                          type: "pressureSensor",
                          value: val,
                        })
                      }
                      isEdit={props.data.isEdit}
                      isNeed={props.data.isEdit}
                      separator="?"
                      idVals={formData.pressure_sensor}
                      paramId={props.editId}
                      paramName="ttd_id"
                      isEditLoading={EditDataLoading}
                      groupClass="mb-3 selectbox col-md-6"
                      groupId="formGroupReactor"
                      label="Pressure Sensor"
                      value={formData.pressureSensor}
                      onSelect={addedSelectVal.bind(
                        null,
                        "pressureSensor",
                        "pressure_sensor",
                        true
                      )}
                      url={`/get/option/pressuresensorpart/`}
                      name="pressureSensorPart"
                      objKey={["serial_number", "part_name", "pm_status"]}
                      isSearch={true}
                      multiple={false}
                      loadMsg="Loading..."
                    /> */}

                      <SingleSelection
                        groupClass="mb-3 selectbox col-md-6"
                        groupId="formGroupReactor"
                        label="TTD Tube Seal Rack"
                        isNeed={props.data.isEdit}
                        separator="?"
                        paramId={props.editId}
                        paramName="ttd_id"
                        value={formData.TTD_tube_seal_rack}
                        onChange={(val, allData) => {
                          dispatchInputChange({
                            type: "TTD_tube_seal_rack",
                            value: val,
                          });
                        }}
                        isSearch={true}
                        url={
                          props.isWhEdit
                            ? `/get/option/ttdtubesealrackpart/?warehouse_id=${props.whId}`
                            : `/get/option/ttdtubesealrackpart/${
                                formData.location_for_warehouse
                                  ? `?wilocation_for_warehoused=${formData.location_for_warehouse}`
                                  : ""
                              }`
                        }
                        name="TTD Tube Seal Rack"
                        objKey={[
                          "serial_number",
                          "part_name",
                          "pm_status",
                          "location_for_warehouse",
                        ]}
                        forPopup={true}
                        setPopupthing={(value) => {
                          dispatchInputChange({
                            type: "TTD_tube_seal_rackName",
                            value,
                          });
                        }}
                      />
                    </div>
                  </Tab>
                </Tabs>
                {formData.isEdit ? (
                  <>
                    <p className="text-center">
                      Can't Edit TTD, As TTD is used in Project that is
                      currently going on,
                    </p>
                    <p className="text-center">
                      <Link
                        to={`/project/edit/${formData.projectId}`}
                        className="btn btn-primary text-center"
                      >
                        Edit Project
                      </Link>
                    </p>
                  </>
                ) : (
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

                    <div className="addEditBtn">
                      <Button
                        variant="primary"
                        type="button"
                        disabled={formStatus.isSubmitting}
                        onClick={showPrompt}
                      >
                        {props.data.submitBtn}
                      </Button>
                      {props.data.isEdit ? (
                        <Link to="/ttd" className="ml30 btn btn-secondary">
                          Cancel Edit
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>

                    {key === 2 ? (
                      ""
                    ) : (
                      <Button type="button" className="" onClick={tabChange}>
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                      </Button>
                    )}
                  </div>
                )}
                <div className="col-md-12 text-center">
                  {formStatus.isError ? (
                    <p className="dangour">{formStatus.errMsg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </Form>
            )}
          </div>
        </Card.Body>
      </Card>
      {isShowPopup ? (
        <EquipPartModal
          show={isShowPopup}
          closeModal={() => setIsShowPopup(false)}
          title="Want to Save TTD ?"
          body={
            <div className="row">
              <div className="col-md-6 grid3Auto rowGap20">
                <span>Name</span> : <span>{formData.alternate_name}</span>
                <span>Serial Number</span> :{" "}
                <span>{formData.serial_number}</span>
                <span>PM Status</span> : <span>{formData.pm_status}</span>
                <span>Remarks</span> : <span>{formData.remarks}</span>
                <span>Supply Orifice Set</span> :{" "}
                <span>{formData?.supply_orifice_setName}</span>
                <span>TTD Tube Seal Rack </span>:{" "}
                <span>{formData?.TTD_tube_seal_rackName}</span>
                <span>Warehouse</span> :{" "}
                <span>{formData?.location_for_warehouseName}</span>
                <span>Is This Part Of Set</span> :{" "}
                <span>{formData?.is_this_part_of_set}</span>
              </div>
              <div className="col-md-6 grid3Auto rowGap20">
                <span>Abbreviation</span> :{" "}
                <span>{formData?.abbreviation}</span>
                <span>Asset Number</span> :{" "}
                <span>{formData?.asset_number}</span>
                <span>Frame</span> : <span>{formData?.frame}</span>
                <span>Pressure Sensor</span> :{" "}
                <span>{formData?.pressure_sensorName}</span>
                <span>Warehouse Storage</span> :{" "}
                <span>{formData?.location_for_storage}</span>
                <span>Packaging</span> : <span>{formData?.packaging}</span>
                <span>How Many In Set</span> :{" "}
                <span>{formData?.if_yes_how_many_in_a_set}</span>
              </div>
              <div className="col-md-12 text-center mt-3">
                <Button
                  variant="primary"
                  type="button"
                  onClick={sendData}
                  disabled={formStatus.isSubmitting}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  className="ml30"
                  type="button"
                  disabled={formStatus.isSubmitting}
                  onClick={() => setIsShowPopup(false)}
                >
                  Go To Form
                </Button>
              </div>
            </div>
          }
        />
      ) : (
        ""
      )}
    </>
  );
};

export default TTDForm;
