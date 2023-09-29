import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Multiselect from "multiselect-react-dropdown";
import { ajaxCall } from "../../../helpers/ajaxCall";
import "react-select-search/style.css";
import SelectSearch from "react-select-search";

const SingleSelection = (props) => {
  // console.log("i have ", props.idVals, props.isEdit);
  const authData = useSelector((state) => state.authStore);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = async () => {
    // console.log("so i have loading parent state", props.isEditLoading);
    // console.log("now id is", props.idVals);
    let url = props.url;
    if (props?.isNeed) {
      url = props.url + `${props.separator}${props.paramName}=${props.paramId}`;
    }
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
      props.objKey.forEach((key, index, arr) => {
        if (index !== 0) name += " - ";
        name += option[key] ? option[key] : "NA";
      });
      if (props.needSlug) {
        return { value: option.slug, name };
      }
      return { value: option.id, name };
    });
    // console.log("editing", props.isEdit);
    // if (props.isEdit) {
    //     console.log(allObj);
    //     const selectedObj = allObj.filter((obj) => props.idVals === obj.id);
    //     props.onEditchange(selectedObj);
    //     console.log("editing val", selectedObj);
    // }
    setOptions(allObj);
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log("i am inside and url is", props.url);
    if (props?.isStatic) {
      setOptions(props?.cols);
      setIsLoading(false);
      return;
    }
    if (props.url?.length) {
      //   props.isEdit
      //     ? props.isEditLoading
      //       ? data()
      //       : console.log("no need")
      //     : data();
      data();
    }
  }, [props.url, props.isEditLoading, props.isEdit]);

  // to get name from value
  useEffect(() => {
    if (props?.forPopup) {
      if (props.value) {
        console.log("finding vals");
        const getSelectedVal = options.find((option) => {
          return option.value == props.value;
        });
        // console.log(getSelectedVal);
        // alert(props.value);
        props.setPopupthing(getSelectedVal ? getSelectedVal.name : "");
      }
    }
  }, [props.value, props?.forPopup, options]);

  let placeholder = isLoading
    ? "Loading"
    : options?.length
    ? "Select Options"
    : "No Data Found";
  if (props.groupId === "formGroupUnitName" && !props.url?.length) {
    placeholder =
      "Please select Equip Prep, Equip Delivery TM & client name to load Units";
  }
  return (
    <Form.Group className={props.groupClass} controlId={props.groupId}>
      <Form.Label>{props.label}</Form.Label>
      <SelectSearch
        options={options}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        search={props.isSearch}
        placeholder={placeholder}
      />
      {/* <Multiselect
        options={options}
        selectedValues={props.value}
        onSelect={props.onSelect}
        onRemove={props.onSelect}
        name={props.name}
        search={props.isSearch}
        placeholder="Select Options"
        singleSelect={!props.multiple}
        displayValue="name"
        loading={isLoading}
        loadingMessage={props.loadMsg}
      /> */}
    </Form.Group>
  );
};

export default SingleSelection;
