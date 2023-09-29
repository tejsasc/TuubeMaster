import React from "react";
import { Card, Form, Tabs, Tab, Button } from "react-bootstrap";
import SelectionBox from "../UI/Form/SelectionBox";

const AllGeneralParts = (props) => {
  return (
    <div className="col-md-12 mt-3 flexCenter">
      <Card className="col-md-8">
        <Card.Body>
          <Card.Title className="mb-3">{props.title}</Card.Title>
          <Form onSubmit="">
            <Tabs
              id="controlled-tab-example"
              // activeKey={key}
              // onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="warehouseInfo" title="Warehouse Info">
                <SelectionBox
                  // onEditchange={(val) =>
                  //   dispatchInputChange({
                  //     type: "unitName",
                  //     value: val,
                  //   })
                  // }
                  // isEdit={props.isEdit}
                  // isEditLoading={EditDataLoading}
                  // idVals={formData.unitId}
                  // proId={props.proId}
                  groupClass="mb-3 selectbox"
                  groupId="formGroupUnitName"
                  label="Warehouse"
                  // value={formData.unitName}
                  // onSelect={addedSelectVal.bind(
                  //   null,
                  //   "unitName",
                  //   "unitId",
                  //   true
                  // )}
                  name="low"
                  // url={
                  //   formData.clientName?.length
                  //     ? `/get/unitlist/?client=${formData.clientName[0].id}`
                  //     : ""
                  // }
                  isSearch={true}
                  objKey={["name_of_unit"]}
                  multiple={false}
                  // loadMsg={
                  //   formData.clientName?.length
                  //     ? "Loading..."
                  //     : "Please select Client Name first"
                  // }
                />
                <Form.Group className="mb-3" controlId="formGroupProName">
                  <Form.Label>Warehouse Storage</Form.Label>
                  <Form.Control
                    type="text"
                    value=""
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "projectName",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey="partInfo" title="Part Info">
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Part Name</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Abbreviation</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Asset Number</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Packaging</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>PM Status</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>File</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Dimension</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupRemark">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    type="text"
                    // value={formData.remark}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "remark",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
              </Tab>
            </Tabs>
            <Button
              variant="primary"
              type="submit"
              // disabled={formStatus.isSubmitting}
            >
              {/* {formStatus.submitBtnVal} */}Submit
            </Button>
          </Form>
          {/* {formStatus.isError ? (
      <p className="dangour">{formStatus.errMsg}</p>
    ) : (
      ""
    )} */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AllGeneralParts;
