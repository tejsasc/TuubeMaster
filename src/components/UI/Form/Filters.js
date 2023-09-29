import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import SelectSearch from "react-select-search";
import SingleSelection from "./SingleSelection";

const Filters = (props) => {
  const [formData, setFormData] = useState({
    pmStatus: "",
    search: "",
    warehouse: "",
  });

  useEffect(() => {
    let url = "";
    if (formData.pmStatus) url = `&pm_status=${formData.pmStatus}`;
    if (formData.warehouse) url = `&warehouse=${formData.warehouse}`;
    let timer;
    if (formData.search) {
      timer = setTimeout(() => {
        url += `&search=${formData.search}`;
        props.changeUrl(url);
      }, [1000]);
    } else {
      props.changeUrl(url);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [formData.pmStatus, formData.warehouse, formData.search]);

  const clearFilter = function () {
    setFormData({ pmStatus: "", search: "", warehouse: "" });
  };
  let clss = "col-md-4";
  if (props.warehouseNotNeeded) {
    clss = "col-md-6";
  }
  return (
    <>
      {formData.pmStatus || formData.search || formData.warehouse ? (
        <button onClick={clearFilter} className="btn btn-secondary">
          Clear Filter
        </button>
      ) : (
        ""
      )}
      <div className="row">
        <Form.Group className={`mb-3 ${clss}`} controlId="pm_status">
          <Form.Label>PM Status</Form.Label>
          <SelectSearch
            options={[
              { name: "Red", value: "RED" },
              { name: "Blue", value: "BLUE" },
              { name: "Green", value: "GREEN" },
            ]}
            placeholder="Choose from options"
            value={formData.pmStatus}
            onChange={(val) => {
              // console.log("val is", val);
              setFormData((data) => {
                return { ...data, pmStatus: val };
              });
            }}
            name="pm_status"
          />
        </Form.Group>

        {/* <SelectSearch
            options={props.warehouseData}
            placeholder="Sort By Warehouse"
            value={warehouse}
            onChange={(val) => {
              setWarehouse(val);
              setCurrentPage(1);
            }}
            name="contract"
          /> */}
        {!props.warehouseNotNeeded && (
          <SingleSelection
            needSlug={true}
            groupClass={`mb-3 selectbox ${clss}`}
            groupId="formGroupWarehouse"
            label="Warehouse"
            isNeed={false}
            separator="?"
            paramId={props.editId}
            paramName=""
            value={formData.warehouse}
            onChange={(val) => {
              setFormData((data) => {
                return { ...data, warehouse: val };
              });
            }}
            isSearch={true}
            objKey={["warehouse_name"]}
            url={`/get/option/warehouse/`}
            forPopup={false}
            setPopupthing={(value) => {
              // dispatchInputChange({
              //   type: "location_for_warehouseName",
              //   value,
              // });
            }}
          />
        )}

        <Form.Group className={`mb-3 ${clss}`} controlId="formGroupProName">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            value={formData.search}
            onChange={(e) => {
              setFormData((data) => {
                return { ...data, search: e.target.value };
              });
            }}
          />
        </Form.Group>
      </div>
    </>
  );
};

export default Filters;
