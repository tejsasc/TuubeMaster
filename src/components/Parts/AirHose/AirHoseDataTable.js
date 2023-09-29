import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ajaxCall } from "../../../helpers/ajaxCall";
import LoadingData from "../../UI/LoadingData";
import Filters from "../../UI/Form/Filters";
import PopOverPMstatus from "../../PopOverPMstatus";
import useDTColumns from "../../../hooks/useDTTable";

const AirHoseDatabTable = (props) => {
  const [equipData, setEquipData] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  // const [promptStatus, setPromptStatus] = useState(false);
  const totalRows = useRef(0);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isFetchErr, setFetchErr] = useState(null);
  const [filterUrl, setFilterUrl] = useState("");

  const getEquip = async () => {
    setIsLoadingData(true);
    let url = `/get/option/airhosepart/?ordering=-created_at&p=${pageNo}&records=${perPage}${filterUrl}`;
    if (props?.warehouse) {
      url += `&warehouse=${props.warehouse}`;
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

        // signal,
      },
      8000
      // timeOutFunction
    );
    if (response.status !== 200) {
      setIsLoadingData(false);
      setEquipData([]);
      setFetchErr("Some Problem Occured Please try again");
      return;
    }
    // console.log(response);
    // console.log(response.count);
    // if (response.status === 200) {
    //   // throw new Error("API call failed with status code " + response.status);
    //   setErr("API call failed with status code ");
    // }
    totalRows.current = response.data?.count;
    setEquipData(response.data?.results);
    setIsLoadingData(false);
    props.setRefreshTable(false);
  };

  useEffect(() => {
    if (props.refreshTable) getEquip();
  }, [props.refreshTable]);

  const columns = [
    {
      cell: (row) => (
        <>
          {/* <Link
            className="projectAction"
            title="Warehouse Dashboard"
            to={`./${row.id}`}
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
          </Link> */}
          <Link
            to={`/airhose/edit/${row.slug}`}
            className="projectAction"
            title="Edit Air Hose"
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
      name: "Name",
      selector: (row) => row.part_name,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Serial Number",
      selector: (row) => row.serial_number,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Asset Number",
      selector: (row) => row.asset_number,
      sortable: true,
    },
    {
      name: "PM Status",
      selector: (row) => (
        <PopOverPMstatus
          pm_status={row.pm_status}
          id={row.id}
          url={`/part/airhoseretupddel/${row.id}/`}
          name="Air Hose"
          setRefreshTable={props.setRefreshTable}
        />
      ),
      sortable: true,
    },

    {
      name: "Location for Warehouse",
      selector: (row) => row.warehouse,
    },
    {
      name: "Location for Storage",
      selector: (row) => row.location_for_storage,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Remarks",
      selector: (row) => row.notes,
    },
  ];
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title className="mb-3">All Air Hose</Card.Title>
        <div>
          <Filters
            warehouseNotNeeded={props.warehouseNotNeeded}
            changeUrl={(url) => {
              setFilterUrl(url);
              setPageNo(1);
              props.setRefreshTable(true);
            }}
          />
          {renderColBtns()}
          <DataTable
            paginationRowsPerPageOptions={[10, 30, 50, 75, 100, 125]}
            paginationPerPage={10}
            onChangePage={(page) => {
              // console.log("new Page numbner is", page);
              setPageNo(page);
              setEquipData([]);
              props.setRefreshTable(true);
            }}
            columns={cols}
            data={equipData}
            onChangeRowsPerPage={(newPerPage, page) => {
              // console.log("per row is changed and data is", newPerPage, page);
              setPerPage(newPerPage);
              setPageNo(page);
              props.setRefreshTable(true);
              setEquipData([]);
              //   setShowWa([]);
            }}
            pagination
            paginationServer
            progressPending={isLoadingData}
            progressComponent={<LoadingData className="loading-spinner-flex" />}
            paginationTotalRows={totalRows.current}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AirHoseDatabTable;
