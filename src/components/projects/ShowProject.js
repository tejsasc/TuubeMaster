import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";
// import LoadingData from "../UI/LoadingData";
import { Card, Col, Container, Row } from "react-bootstrap";
import ValInput from "../UI/Form/ValInput";

function ShowProject(props) {
  const [refreshData, setRefreshData] = useState(true);
  const [projectData, setProjectData] = useState(null);
  // const [updatingData, setUpdatingData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setErr] = useState(false);
  const authData = useSelector((state) => state.authStore);
  let modalHead, modalBody, modalFooter;
  const getProjectData = async () => {
    const response = await ajaxCall(
      `/alllist/project/${props.proId}/`,
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
    if (response?.status !== 200) {
      setErr(true);
      setIsLoading(false);
      return;
    } else {
      setProjectData(response.data);
      setIsLoading(false);
    }
    setRefreshData(false);
    // setLoadError({ isLoading: false, isError: false, isSubmitting: false });
  };

  useEffect(() => {
    if (refreshData) getProjectData(props.proId);
  }, [props.proId, refreshData]);

  const doGrid = (
    name,
    val,
    cond = false,
    condVal = null,
    key,
    type = "text",
    isUpdateNeed
  ) => {
    if (cond) if (!condVal) return;

    return (
      <Col md={6}>
        <Row>
          <Col md={6}>
            <span
              title={`${isUpdateNeed ? "Edit" + name : ""}`}
              className={`${isUpdateNeed ? "tBold" : ""}`}
            >
              {name}
            </span>
          </Col>
          <Col md={6}>
            <ValInput
              refreshData={setRefreshData}
              val={val}
              proId={props.proId}
              keyDB={key}
              type={type}
              isUpdateNeed={isUpdateNeed}
            />
          </Col>
        </Row>
      </Col>
    );
  };
  const doArrayGrid = (name, val, cond = false, condVal = null) => {
    if (cond) if (!condVal) return;
    console.log("val is", val);
    return (
      <Col md={6}>
        <Row>
          <Col md={6}>{`${name} ${val?.length ? `(${val.length})` : ""}`}</Col>
          <Col md={6}>
            <div className="showFlex">
              <span>:</span>
              {val?.length ? (
                cond ? (
                  <ul className="listPorjectDetail">
                    {val.map((val) => (
                      <li>{val[condVal]}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="listPorjectDetail">
                    {val.map((val) => (
                      <li>{val.serial_number}</li>
                    ))}
                  </ul>
                )
              ) : (
                `No ${name} assigned`
              )}
            </div>
          </Col>
        </Row>
      </Col>
    );
  };
  if (projectData) {
    modalHead = <h2>{projectData.project_name}</h2>;
    modalBody = (
      <>
        <Container>
          <Card>
            <Card.Body>
              <Row>
                <Card.Title className="text-center mb-3">
                  General Info
                </Card.Title>

                <hr />
                {doGrid(
                  "Client Name",
                  projectData.client,
                  false,
                  null,
                  "official_name",
                  "text",
                  false
                )}
                {doGrid(
                  "Unit Name",
                  projectData.unit,
                  false,
                  null,
                  "name_of_unit",
                  "text",
                  false
                )}
                <hr />
                {doArrayGrid(
                  "Reactor Name",
                  projectData.reactor,
                  true,
                  "reactor_name"
                )}
                {doGrid(
                  "Project Number",
                  projectData.project_number,
                  false,
                  null,
                  "project_number",
                  "text",
                  true
                )}
                <hr />
                {doArrayGrid(
                  "Scope of work",
                  projectData.scope_of_work,
                  true,
                  "name"
                )}
                {doGrid(
                  "Contract",
                  projectData.contract,
                  false,
                  null,
                  "contract",
                  "text",
                  false
                )}
                <hr />
                {doGrid(
                  "Sub contract client name",
                  projectData.if_sub_client_name,
                  true,
                  projectData.contract,
                  "",
                  "",
                  false
                )}
                {doGrid(
                  "Remark",
                  projectData.general_remarks,
                  false,
                  null,
                  "",
                  "",
                  false
                )}
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Row>
                <Card.Title className="text-center mb-3">
                  Project Dates
                </Card.Title>

                <h3 className="text-center"></h3>
                <hr />
                {doGrid(
                  "Equipment Preperation Date",
                  projectData.equipment_prep,
                  false,
                  null,
                  "equipment_prep",
                  "date",
                  true
                )}
                {doGrid(
                  "Equipment Ready Date",
                  projectData.equipment_ready,
                  false,
                  null,
                  "equipment_ready",
                  "date",
                  true
                )}
                <hr />
                {doGrid(
                  "Equipment Ship Client Date",
                  projectData.equipment_ship_client,
                  false,
                  null,
                  "equipment_ship_client",
                  "date",
                  true
                )}
                {doGrid(
                  "Equipment Delivery Client Date",
                  projectData.equipment_delivery_client,
                  false,
                  null,
                  "equipment_delivery_client",
                  "date",
                  true
                )}
                <hr />
                {doGrid(
                  "Project Start Date",
                  projectData.project_start,
                  false,
                  null,
                  "project_start",
                  "date",
                  true
                )}
                {doGrid(
                  "Project End Date",
                  projectData.project_end,
                  false,
                  null,
                  "project_end",
                  "date",
                  true
                )}
                <hr />
                {doGrid(
                  "Equipment return client Date",
                  projectData.equipment_return_tubemaster,
                  false,
                  null,
                  "equipment_return_tubemaster",
                  "date",
                  true
                )}
                {doGrid(
                  "Equipment Delivery Date",
                  projectData.equipment_delivery_tubemaster,
                  false,
                  null,
                  "equipment_delivery_tubemaster",
                  "date",
                  true
                )}
                <hr />
                {doGrid(
                  "Equipment Info Remark",
                  projectData.equipment_info_remarks,
                  false,
                  null,
                  "equipment_info_remarks",
                  "text",
                  true
                )}
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Row>
                <Card.Title className="text-center mb-3">
                  Assigned Equipments
                </Card.Title>

                <hr />
                {doArrayGrid("TTD", projectData.ttd)}
                {doArrayGrid("BDD", projectData.bdd)}
                <hr />
                {doArrayGrid(
                  "Calibration stand",
                  projectData.calibration_stand
                )}
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Row>
                <Card.Title className="text-center mb-3">
                  Assigned Parts
                </Card.Title>
                <hr />
                {doArrayGrid("Part", projectData.part)}{" "}
                {doArrayGrid(
                  "Calibration Orifice",
                  projectData.calibration_orifice_part
                )}
                <hr />
                {doArrayGrid("Device Hose", projectData.device_part)}
                {doArrayGrid("Air Hose", projectData.airhose_part)}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
  if (isErr) {
    return (
      <Modal
        show={props.show}
        close={props.changeStatus}
        isLoading={isLoading}
        showHeader
        showBody
        showFooter
        modalHead="Some Problem Occured"
        modalBody={
          <h5 className="text-center">Failed To Load Data, Please Try Again</h5>
        }
      />
    );
  } else
    return (
      <Modal
        show={props.show}
        close={props.changeStatus}
        isLoading={isLoading}
        showHeader
        showBody
        showFooter
        modalHead={modalHead}
        modalBody={modalBody}
        // modalBody={<p className="text-center dangour">problem occured</p>}
        modalFooter={modalFooter}
      />
    );
}

export default ShowProject;
