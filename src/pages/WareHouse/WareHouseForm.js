import React, { useEffect, useMemo, useReducer, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
// import Multiselect from "multiselect-react-dropdown";
import countryList from "react-select-country-list";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/uiStore";
import LoadingData from "../../components/UI/LoadingData";
import SelectSearch from "react-select-search";

const InitialState = {
  warehouse_name: "",
  warehouse_location: "",
  warehouse_contact: "",
  warehouse_email: "",
  warehouse_manager: "",
  country: "",
  //countryObj: {},
};

const reducer = (state, action) => {
  // console.log(action.data);
  if (action?.reset) {
    return InitialState;
  }
  if (action?.type === "update") {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const WareHouseForm = (props) => {
  const [formData, dispatchInputChange] = useReducer(reducer, InitialState);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(formData);
  const authData = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  const initialSubmit = {
    isError: false,
    errMsg: null,
    isSubmitting: false,
  };
  const [formStatus, setFormStatus] = useState(initialSubmit);
  // console.log(formData);
  const countryOptions = useMemo(() => countryList().getData(), []);

  const countryListsArray = useMemo(() => {
    return countryOptions.map((country) => {
      return {
        value: country.value,
        name: country.label,
      };
    });
  }, []);

  const sendWareHouseData = async function (e) {
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    e.preventDefault();
    // console.log(formData);
    if (!formData.warehouse_name) {
      setFormStatus({
        isError: true,
        errMsg: "Please enter Warehouse Name",
        isSubmitting: false,
      });
      return;
    }
    let url, method;
    if (props.data.isEdit) {
      url = `/retupddel/warehouse/${props.data.editId}/`;
      method = "PATCH";
    } else {
      url = "/create/warehouse/";
      method = "POST";
    }
    const response = await ajaxCall(
      url,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method,
        body: JSON.stringify(formData),
        // signal,
      },
      8000
      // timeoutfun
    );
    // console.log(response);
    setFormStatus(initialSubmit);
    if (response.status === 201) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "Warehouse",
          msg: `Warehouse ${formData.warehouse_name} Added Successfully`,
        })
      );
      dispatchInputChange({ reset: true });
    }
    if (response.status === 200) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "Warehouse",
          msg: `Warehouse ${formData.warehouse_name} Edited Successfully`,
        })
      );
      dispatchInputChange({ reset: true });
    }
    props.refresh();
    props.cancelEdit();
  };

  const getWareHouseData = async function () {
    setIsLoading(true);
    // console.log("it's", props.data.editId);
    const response = await ajaxCall(
      `/retupddel/warehouse/${props.data.editId}/`,
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
    const countryName = countryList().getLabel(response.data?.country);
    // console.log(countryName);
    dispatchInputChange({
      type: "update",
      data: {
        warehouse_name: response.data?.warehouse_name,
        warehouse_location: response.data?.warehouse_location,
        warehouse_contact: response.data?.warehouse_contact,
        warehouse_email: response.data?.warehouse_email,
        warehouse_manager: response.data?.warehouse_manager,
        country: response.data?.country,
        countryObj: countryName
          ? { value: response.data?.country, label: countryName }
          : {},
      },
    });
  };
  // if it's edit then let's do it
  useEffect(() => {
    if (props.data.isEdit) {
      getWareHouseData();
    }
  }, [props.data]);

  const cancelEdit = function () {
    dispatchInputChange({ reset: true });
    setFormStatus(initialSubmit);
    props.cancelEdit();
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="mb-3">{props.data.title}</Card.Title>
          {props.data.isEdit && isLoading ? (
            <LoadingData className="loading-spinner-flex" />
          ) : (
            <Form onSubmit={sendWareHouseData} className="row">
              <Form.Group
                className="mb-3 col-md-4"
                controlId="formGroupProName"
              >
                <Form.Label>Warehouse Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.warehouse_name}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "warehouse_name",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-4" controlId="formGroupRemark">
                <Form.Label>Warehouse Location</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.warehouse_location}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "warehouse_location",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-4" controlId="formGroupRemark">
                <Form.Label>Warehouse contact</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.warehouse_contact}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "warehouse_contact",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-4" controlId="formGroupRemark">
                <Form.Label>Warehouse email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.warehouse_email}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "warehouse_email",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-4" controlId="formGroupRemark">
                <Form.Label>Warehouse manager</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.warehouse_manager}
                  onChange={(e) =>
                    dispatchInputChange({
                      type: "warehouse_manager",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 selectbox col-md-4"
                controlId="formGroupCountry"
              >
                <Form.Label>Country</Form.Label>
                <SelectSearch
                  options={countryListsArray}
                  placeholder="Choose from options"
                  value={formData.country}
                  onChange={(val) => {
                    // console.log(val);
                    dispatchInputChange({
                      type: "country",
                      value: val,
                    });
                  }}
                  search={true}
                  name="countryObj"
                />
              </Form.Group>
              <div className="col-md-12 text-center">
                {formStatus.isError ? (
                  <p className="dangour text-center">{formStatus.errMsg}</p>
                ) : (
                  ""
                )}{" "}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={formStatus.isSubmitting}
                >
                  {/* {formStatus.submitBtnVal} */}
                  {props.data.submitBtn}
                </Button>
                {props.data.isEdit ? (
                  <Button
                    variant="secondary"
                    type="button"
                    className="ml30"
                    disabled={formStatus.isSubmitting}
                    onClick={cancelEdit}
                  >
                    Cancel Edit
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default WareHouseForm;
