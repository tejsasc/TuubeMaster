import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ajaxCall } from "../../helpers/ajaxCall";
// import Filters from "../UI/Form/Filters";
import LoadingData from "../UI/LoadingData";
import ShowProject from "../projects/ShowProject";
import useDTColumns from "../../hooks/useDTTable";

const ProjectDT = (props) => {
  const [projects, setProjects] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showProject, setShowProject] = useState({ show: false, proId: null });
  const [isLoadingData, setIsLoadingData] = useState(false);
  // const [promptStatus, setPromptStatus] = useState(false);
  const totalRows = useRef(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFetchErr, setFetchErr] = useState(null);
  const [filterUrl, setFilterUrl] = useState("");

  const getProjects = async () => {
    setIsLoadingData(true);
    let url = `/dashboard/?status=${props.statusVal}&p=${pageNo}&records=${perPage}`;

    // if (props?.warehouse) {
    //   url += `&id=${props.warehouse}`;
    // }
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
    console.log(response);
    // if (response.status === 200) {
    //   // throw new Error("API call failed with status code " + response.status);
    //   setErr("API call failed with status code ");
    // }
    totalRows.current = response.data?.count;
    setProjects(response.data?.results);
    setIsLoadingData(false);
    // props.setRefreshTable(false);
  };

  useEffect(() => {
    if (props.refreshTable) getProjects();
  }, [props.refreshTable, perPage, pageNo]);

  const columns = [
    {
      cell: (row) => (
        <>
          <button
            className="projectAction"
            title="See Project"
            onClick={() => {
              setShowProject({ show: true, proId: row.slug });
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
          <Link
            to={`project/edit/${row.slug}`}
            className="projectAction"
            title="Edit Projects"
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
          </Link>
          {/* <button
            className="projectAction"
            title="Delete Warehouse"
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
      name: "Project Name",
      selector: (row) => row.project_name,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Project Number",
      selector: (row) => row.project_number,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Client Name",
      selector: (row) => row?.client?.official_name,
      sortable: true,
    },
    {
      name: "Unit Name",
      selector: (row) => row.unit?.name_of_unit,
      sortable: true,
    },
    {
      name: "Project Start",
      selector: (row) =>
        row?.project_start
          ? row?.project_start?.split("-").reverse().join("-")
          : "",
    },
    {
      name: "Project End",
      selector: (row) =>
        row?.project_end
          ? row?.project_end?.split("-").reverse().join("-")
          : "",
    },
    {
      name: "Expected Delivery TM",
      selector: (row) =>
        row?.equipment_delivery_tubemaster
          ? row?.equipment_delivery_tubemaster?.split("-").reverse().join("-")
          : "",
    },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="mb-3">{props.title}</Card.Title>
          <div>
            {/* <Filters
            changeUrl={(url) => {
              setFilterUrl(url);
              //   props.setRefreshTable(true);
            }}
          /> */}
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
                setPerPage(newPerPage);
                setPageNo(page);
                setShowProject([]);
              }}
              // selectableRows
              // onSelectedRowsChange=""
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
    </>
  );
};

export default ProjectDT;
