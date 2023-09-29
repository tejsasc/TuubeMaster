import React, { useEffect, useReducer, useState } from "react";
import { Card, Form, Tabs, Tab, Button, InputGroup } from "react-bootstrap";
// import Multiselect from "multiselect-react-dropdown";
import SelectSearch from "react-select-search";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { uiAction } from "../../../store/uiStore";
import { ajaxCall } from "../../../helpers/ajaxCall";
import LoadingData from "../../UI/LoadingData";
// import SelectionBox from "../../UI/Form/SelectionBox";
import FileUpload from "../../UI/Form/FileUpload";
import SelectInputGroup from "../../formComponent/SelectInputGroup";
import SingleSelection from "../../UI/Form/SingleSelection";
import EquipPartModal from "../../EquipPartModal";

const initialState = {
  wareHouse: [],
  location_for_warehouse: null,
  location_for_warehouseName: "",
  location_for_storage: "",
  packaging: "",
  alternate_name: "",
  abbreviation: "",
  serial_number: "",
  asset_number: "",
  pm_status: "",
  image: "",
  remarks: "",
  price: "",
  colorCode: "",
  length: "",
  breadth: "",
  height: "",
  unitDimention: "CM",
  Weight: "",
  unitWeight: "KG",
};

const reducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.reset) {
    return initialState;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const AllGeneralPartForm = (props) => {
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [key, setKey] = useState(0);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [EditDataLoading, setEditDataLoading] = useState(false);
  const [formData, dispatchInputChange] = useReducer(reducer, initialState);
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

  const appendData = function (data, field, value, isFile = false) {
    // console.log(isFile);
    // if (props.edit && isFile) {
    //   console.log(value instanceof File);
    //   if (value instanceof File) {
    //     data.append(field, value);
    //   }
    // } else if (value && !isFile) data.append(field, value);
    if (field === "upload_file" && value instanceof File)
      data.append(field, value);
    else if (field !== "upload_file" && value) data.append(field, value);
    else if (field !== "upload_file") data.append(field, "");
  };

  const getformData = function () {
    const data = new FormData();
    appendData(data, "location_for_warehouse", formData.location_for_warehouse);
    appendData(data, "location_for_storage", formData.location_for_storage);
    appendData(data, "packaging", formData.packaging);
    appendData(data, "part_name", formData.alternate_name);
    appendData(data, "name_of_abbreviation", formData.abbreviation);
    appendData(data, "serial_number", formData.serial_number);
    appendData(data, "colour_code", formData.colorCode);
    appendData(data, "asset_number", formData.asset_number);
    appendData(data, "pm_status", formData.pm_status);
    appendData(data, "frame", formData.frame);
    appendData(data, "upload_file", formData.image, true);
    appendData(data, "notes", formData.remarks);
    appendData(data, "price", formData.price);
    appendData(data, "length", formData.length);
    appendData(data, "breadth", formData.breadth);
    appendData(data, "height", formData.height);
    appendData(data, "dimension_unit", formData.unitDimention);
    appendData(data, "weight_unit", formData.unitWeight);
    appendData(data, "weight", formData.Weight);
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
      url = `/part/allgeneralpartretupddel/${props.editId}/`;
      method = "PATCH";
    } else {
      url = "/part/allgeneralpartcreate/";
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
          heading: "General Part",
          msg: `General Part ${formData.alternate_name} Added Successfully`,
        })
      );
      dispatchInputChange({ reset: true });
    } else if (response.status === 200) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "General Part",
          msg: `General Part ${formData.alternate_name} Edited Successfully`,
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

  const getAirHoseData = async function () {
    setIsLoading(true);
    // console.log("it's", props.editId);
    const response = await ajaxCall(
      `/part/allgeneralpartretupddel/${props.editId}/`,
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
    // console.log(response);
    setIsLoading(false);
    if (response?.status !== 200) return;
    dispatchInputChange({
      type: "update",
      data: {
        ...response.data,
        wareHouse: [],
        location_for_warehouse: response.data?.location_for_warehouse,
        location_for_storage: response.data?.location_for_storage,
        packaging: response.data?.packaging,
        alternate_name: response.data?.part_name,
        abbreviation: response.data?.name_of_abbreviation,
        serial_number: response.data?.serial_number,
        asset_number: response.data?.asset_number,
        pm_status: response.data?.pm_status,
        image: response.data?.upload_file,
        remarks: response.data?.notes,
        price: response.data?.price,
        colorCode: response.data?.colour_code,
        length: response.data?.length,
        breadth: response.data?.breadth,
        height: response.data?.height,
        unitDimention: response.data?.dimension_unit,
        Weight: response.data?.weight,
        unitWeight: response.data?.weight_unit,
      },
    });
    setEditDataLoading(true);
  };
  // if it's edit then let's do it
  useEffect(() => {
    // console.log("is edit is", props.data.isEdit);
    if (props.data.isEdit && props.editId) {
      getAirHoseData();
    } else {
      dispatchInputChange({ reset: true });
    }
  }, [props.data, props.editId]);

  const location = useLocation();

  useEffect(() => {
    setKey(0);
  }, [location]);

  useEffect(() => {
    if (props.isWhEdit) {
      dispatchInputChange({
        type: "location_for_warehouse",
        value: props.whId,
      });
    }
  }, [props.isWhEdit]);

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
          {" "}
          <div className="row">
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
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey={0} title="Warehouse Info">
                    <div className="row">
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
                          onChange={(val) => {
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
                    </div>
                  </Tab>
                  <Tab eventKey={1} title="General Part Info">
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
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            dispatchInputChange({
                              type: "price",
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
                      <div className="col-md-6">
                        <Form.Label>Length</Form.Label>
                        <InputGroup className="mb-3" size="sm">
                          <Form.Control
                            className="col-md-8"
                            type="number"
                            value={formData.length}
                            onChange={(e) =>
                              dispatchInputChange({
                                type: "length",
                                value: e.target.value,
                              })
                            }
                          />
                          <InputGroup.Text id="unitDimLength">
                            <SelectInputGroup
                              change={(e) =>
                                dispatchInputChange({
                                  type: "unitDimention",
                                  value: e.target.value,
                                })
                              }
                              val={formData.unitDimention}
                              options={[
                                { name: "CM", value: "CM" },
                                { name: "MM", value: "MM" },
                                { name: "Inch", value: "Inch" },
                              ]}
                              class="col-md-4"
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      <div className="col-md-6">
                        <Form.Label>Breadth</Form.Label>
                        <InputGroup className="mb-3" size="sm">
                          <Form.Control
                            className="col-md-8"
                            type="number"
                            value={formData.breadth}
                            onChange={(e) =>
                              dispatchInputChange({
                                type: "breadth",
                                value: e.target.value,
                              })
                            }
                          />
                          <InputGroup.Text id="unitDimbreadth">
                            <SelectInputGroup
                              change={(e) =>
                                dispatchInputChange({
                                  type: "unitDimention",
                                  value: e.target.value,
                                })
                              }
                              val={formData.unitDimention}
                              options={[
                                { name: "CM", value: "CM" },
                                { name: "MM", value: "MM" },
                                { name: "Inch", value: "Inch" },
                              ]}
                              class="col-md-4"
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      <div className="col-md-6">
                        <Form.Label>Height</Form.Label>
                        <InputGroup className="mb-3" size="sm">
                          <Form.Control
                            className="col-md-8"
                            type="number"
                            value={formData.height}
                            onChange={(e) =>
                              dispatchInputChange({
                                type: "height",
                                value: e.target.value,
                              })
                            }
                          />
                          <InputGroup.Text id="unitDimHeight">
                            <SelectInputGroup
                              change={(e) =>
                                dispatchInputChange({
                                  type: "unitDimention",
                                  value: e.target.value,
                                })
                              }
                              val={formData.unitDimention}
                              options={[
                                { name: "CM", value: "CM" },
                                { name: "MM", value: "MM" },
                                { name: "Inch", value: "Inch" },
                              ]}
                              class="col-md-4"
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      <div className="col-md-6">
                        <Form.Label>Weight</Form.Label>
                        <InputGroup className="mb-3" size="sm">
                          <Form.Control
                            className="col-md-8"
                            type="number"
                            value={formData.Weight}
                            onChange={(e) =>
                              dispatchInputChange({
                                type: "Weight",
                                value: e.target.value,
                              })
                            }
                          />
                          <InputGroup.Text id="unitDimHeight">
                            <SelectInputGroup
                              change={(e) =>
                                dispatchInputChange({
                                  type: "unitWeight",
                                  value: e.target.value,
                                })
                              }
                              val={formData.unitWeight}
                              options={[
                                { name: "KG", value: "KG" },
                                { name: "LBS", value: "LBS" },
                              ]}
                              class="col-md-4"
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
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
                    type="button"
                    disabled={formStatus.isSubmitting}
                    onClick={showPrompt}
                  >
                    {props.data.submitBtn}
                  </Button>
                  {props.data.isEdit ? (
                    <Link to="/general-parts" className="btn btn-secondary">
                      Cancel Edit
                    </Link>
                  ) : (
                    ""
                  )}

                  {key === 2 ? (
                    ""
                  ) : (
                    <Button type="button" className="" onClick={tabChange}>
                      <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </Button>
                  )}
                </div>
                <div className="col-md-12 text-center">
                  {formStatus.isError ? (
                    <p className="dangour">{formStatus.errMsg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </Form>
            )}
          </div>{" "}
        </Card.Body>
      </Card>{" "}
      {isShowPopup ? (
        <EquipPartModal
          show={isShowPopup}
          closeModal={() => setIsShowPopup(false)}
          title="Want to Save General Part ?"
          body={
            <div className="row">
              <div className="col-md-6 grid3Auto rowGap20">
                <span>Name</span> : <span>{formData.alternate_name}</span>
                <span>Serial Number</span> :{" "}
                <span>{formData.serial_number}</span>
                <span>PM Status</span> : <span>{formData.pm_status}</span>
                <span>Remarks</span> : <span>{formData.remarks}</span>
                <span>Warehouse</span> :{" "}
                <span>{formData?.location_for_warehouseName}</span>
                <span>Breadth </span>:{" "}
                <span>
                  {formData?.breadth} {formData?.unitDimention}
                </span>
                <span>Weight </span>:{" "}
                <span>
                  {formData?.Weight} {formData?.unitWeight}
                </span>{" "}
                <span>Abbreviation</span> :{" "}
                <span>{formData?.abbreviation}</span>
              </div>
              <div className="col-md-6 grid3Auto rowGap20">
                <span>Asset Number</span> :{" "}
                <span>{formData?.asset_number}</span>
                <span>Price</span> : <span>{formData?.price}</span>
                <span>Warehouse Storage</span> :
                <span>{formData?.location_for_storage}</span>
                <span>Packaging</span> : <span>{formData?.packaging}</span>
                <span>Length</span> :
                <span>
                  {formData?.length} {formData?.unitDimention}
                </span>
                <span>Height</span>:
                <span>
                  {formData?.height} {formData?.unitDimention}
                </span>
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

export default AllGeneralPartForm;
