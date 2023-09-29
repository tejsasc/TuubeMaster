import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { ajaxCall } from "../../../helpers/ajaxCall";
import "react-select-search/style.css";

const SelectionBox = (props) => {
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
        if (index != 0) name += " - ";
        name += option[key];
      });
      return { id: option.id, name };
    });

    // console.log("editing", props.isEdit);

    if (props.isEdit) {
      if (props.multiple) {
        const selectedObj = allObj.filter((obj) => {
          for (let i = 0; i < props.idVals.length; i++) {
            if (props.idVals[i] === obj.id) return true;
          }
          return false;
        });
        // console.log("editing val", selectedObj);
        props.onEditchange(selectedObj);
      } else {
        // console.log(allObj);
        const selectedObj = allObj.filter((obj) => props.idVals === obj.id);
        props.onEditchange(selectedObj);
        // console.log("editing val", selectedObj);
      }
    }
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
      props.isEdit
        ? props.isEditLoading
          ? data()
          : console.log("no need")
        : data();
      // data();
    }
  }, [props.url, props.isEditLoading, props.isEdit]);

  return (
    <Form.Group className={props.groupClass} controlId={props.groupId}>
      <Form.Label>{props.label}</Form.Label>
      <Multiselect
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
      />
    </Form.Group>
  );
};

export default SelectionBox;
