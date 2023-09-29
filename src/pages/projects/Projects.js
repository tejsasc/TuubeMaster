import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowProject from "../../components/projects/ShowProject";
import LoadingData from "../../components/UI/LoadingData";
import Modal from "../../components/UI/Modal";
// import { uiAction } from "../../store/uiStore";
import useDTColumns from "../../hooks/useDTTable";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showProject, setShowProject] = useState({ show: false, proId: null });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [promptStatus, setPromptStatus] = useState(false);
  const totalRows = useRef(0);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isFetchErr, setFetchErr] = useState(null);
  // const [filterUrl, setFilterUrl] = useState("");
  // const [err, setErr] = useState();
  // const deleteEntryDetails = useRef({});s

  // const promptDelete = (project_name, deleteId) => {
  //   setPromptStatus(true);
  //   deleteEntryDetails.current = { name: project_name, id: deleteId };
  // };

  // const deleteProject = async function (deleteId) {
  //   setIsLoadingData(true);
  //   const response = await ajaxCall(
  //     `/get/project/${deleteId}/`,
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${authData.accessToken}`,
  //       },
  //       method: "DELETE",

  //       // signal,
  //     },
  //     8000
  //   );
  //   if (response.status === 204) {
  //     dispatch(
  //       uiAction.setNotification({
  //         show: true,
  //         heading: "Project",
  //         msg: `Project ${deleteEntryDetails.current.name} Deleted Successfully`,
  //       })
  //     );
  //   }
  //   console.log("response is ", response);
  //   // if (response !== true) {
  //   //   setThrowErr({ ...response, page: "enquiries" });
  //   //   return;
  //   // }
  //   // dispatch(
  //   //   uiAction.setNotification({
  //   //     show: true,
  //   //     heading: "Enquiry Deleted Successfully",
  //   //     msg: `<strong>${deleteEntryDetails.current.name}</strong> enquiry Deleted successfully`,
  //   //   })
  //   // );
  //   deleteEntryDetails.current = {};

  //   getProjects();
  //   // setEnqData([]);
  // };

  const getProjects = async (url) => {
    setIsLoadingData(true);
    const response = await ajaxCall(
      url,
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
      // timeOutFunction
    );
    if (response.status !== 200) {
      setIsLoadingData(false);
      setProjects([]);
      setFetchErr("Some Problem Occured Please try again");
      return;
    }
    // console.log(response);
    // if (response.status === 200) {
    //   // throw new Error("API call failed with status code " + response.status);
    //   setErr("API call failed with status code ");
    // }
    totalRows.current = response.data?.count;
    setProjects(() => {
      // giving slug as id, because in middle we addes slug so by changing here only making impact everywhere
      return response.data?.results.map((data) => {
        return {
          id: data?.slug,
          projectNumber: data?.project_number,
          projectName: data?.project_name,
          clientName: data?.client,
          projectStart: data?.project_start
            ? data?.project_start?.split("-").reverse().join("-")
            : "",
          projectEnd: data?.project_end
            ? data?.project_end?.split("-").reverse().join("-")
            : "",
          unitName: data?.unit,
          contract: data?.contract,
          equipmentDeliveryTM: data?.equipment_delivery_tubemaster
            ? data?.equipment_delivery_tubemaster
                ?.split("-")
                .reverse()
                .join("-")
            : "-",
        };
      });
    });
    setIsLoadingData(false);
  };

  useEffect(() => {
    const url = `/listproject/?ordering=-created_at&p=${pageNo}&records=${perPage}`;
    getProjects(url);
  }, [pageNo, perPage]);

  const columns = [
    {
      cell: (row) => (
        <>
          <button
            className="projectAction"
            title="See Project"
            onClick={() => {
              setShowProject({ show: true, proId: row.id });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button
            className="projectAction"
            title="Edit Project"
            onClick={() => {
              navigate(`/project/edit/${row.id}`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-edit-2 p-1 br-8 mb-1"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>
          {/* <button
            className="projectAction"
            title="Delete Project"
            onClick={() => {
              promptDelete(row.projectName, row.id);
              // deleteEnquiry(row.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-trash p-1 br-8 mb-1"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button> */}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Project Number",
      selector: (row) => row.projectNumber,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Project Name",
      selector: (row) => row.projectName,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Client Name",
      selector: (row) => row.clientName,
      sortable: true,
    },
    {
      name: "Unit Name",
      selector: (row) => row.unitName,
      sortable: true,
    },
    {
      name: "Project Start",
      selector: (row) => row.projectStart,
    },
    {
      name: "Project End",
      selector: (row) => row.projectEnd,
    },
    {
      name: "Equipment Delivery Expected",
      selector: (row) => row.equipmentDeliveryTM,
    },
    // {
    //   name: "Ttds",
    // },
    // {
    //   name: "BDDS",
    // },
    // {
    //   name: "Calibration Stands",
    // },
    // {
    //   name: "Supply Orific",
    // },
    // {
    //   name: "Pressure Sensor",
    // },
    // {
    //   name: "Calibration Stands",
    // },
    // {
    //   name: "Swab Master",
    // },
    // {
    //   name: "Device Hose",
    // },
    // {
    //   name: "Air Hose",
    // },
    // {
    //   name: "Equipment Info Remarks",
    // },
    // {
    //   name: "General Remarks",
    // },
    // {
    //   name: "Last comments",
    // },
  ];
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  if (isFetchErr) {
    return (
      <Card className="mt-3">
        <Card.Body>
          <p className="text-center dangour">{isFetchErr}</p>
        </Card.Body>
      </Card>
    );
  } else
    return (
      <>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className="mb-3">All Project</Card.Title>
            <div>
              {renderColBtns()}
              <DataTable
                paginationRowsPerPageOptions={[10, 30, 50, 75, 100, 125]}
                paginationPerPage={10}
                onChangePage={(page) => {
                  setPageNo(page);
                  setProjects([]);
                }}
                columns={cols}
                data={projects}
                onChangeRowsPerPage={(newPerPage, page) => {
                  // console.log(
                  //   "per row is changed and data is",
                  //   newPerPage,
                  //   page
                  // );
                  setPerPage(newPerPage);
                  setPageNo(page);
                  setShowProject([]);
                }}
                pagination
                paginationServer
                progressPending={isLoadingData}
                progressComponent={
                  <LoadingData className="loading-spinner-flex" />
                }
                paginationTotalRows={totalRows.current}
                key={totalRows.current}
              />
            </div>
          </Card.Body>
        </Card>
        {showProject.show ? (
          <ShowProject
            show={showProject.show}
            proId={showProject.proId}
            changeStatus={() => setShowProject({ show: false, proId: null })}
          />
        ) : (
          ""
        )}
        {promptStatus ? (
          <Modal
            show={promptStatus}
            close={() => setPromptStatus(false)}
            isLoading={false}
            showHeader={false}
            showBody
            showFooter={false}
            modalBody={
              <div className="delete-modal text-center">
                <div className="delete-modal__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#f15e5e"
                      d="M8.27 3L3 8.27v7.46L8.27 21h7.46C17.5 19.24 21 15.73 21 15.73V8.27L15.73 3M9.1 5h5.8L19 9.1v5.8L14.9 19H9.1L5 14.9V9.1m6 5.9h2v2h-2v-2m0-8h2v6h-2V7"
                    />
                  </svg>
                </div>
                <div className="delete-modal__text">
                  <h3>Are you sure?</h3>
                  <p>
                    Do you really want to delete
                    {/* <strong> {deleteEntryDetails.current.name} ?</strong> */}
                  </p>
                </div>
                <div className="delete-modal__action">
                  <button
                    class="btn btn-light-dark mb-2 me-4"
                    onClick={() => {
                      setPromptStatus(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-danger mb-2 me-4"
                    onClick={() => {
                      // deleteProject(deleteEntryDetails.current.id);
                      setPromptStatus(false);
                    }}
                  >
                    Delete
                  </button>
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

export default Projects;
