import React, { useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ajaxCall } from "../../helpers/ajaxCall";
import Filters from "../UI/Form/Filters";
import LoadingData from "../UI/LoadingData";
import useDTColumns from "../../hooks/useDTTable";

const AllEquip = (props) => {
  const [equipData, setEquipData] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  // const [promptsStatus, setPromptStatus] = useState(false);
  const totalRows = useRef(0);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isFetchErr, setFetchErr] = useState(null);
  const [filterUrl, setFilterUrl] = useState("");

  let clss = "col-md-4";
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const todayDate = `${year}-${String(month).padStart(2, 0)}-${day}`;
  const [searchDate, setSearchDate] = useState("");

  const clearFilter = () => {
    setSearchDate("");
  };

  const getEquip = async () => {
    setIsLoadingData(true);
    let url = `/wef/?p=${pageNo}&records=${perPage}&date=${searchDate}${filterUrl}`;
    if (props?.warehouse) {
      url += `&slug=${props.warehouse}`;
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
    setEquipData(response.data?.results.results);
    setIsLoadingData(false);
    props.setRefreshTable(false);
  };

  useEffect(() => {
    if (new Date(searchDate) instanceof Date) getEquip();
  }, [props.refreshTable, searchDate]);

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
            to={
              "TTD_tube_seal_rack" in row
                ? `/ttd/edit/${row.slug}`
                : "BDD_tube_seal_rack" in row
                ? `/bdd/edit/${row.slug}`
                : "calibration_orifice_set" in row
                ? `/calibration-stand/edit/${row.slug}`
                : "Swab_Master_Tube_Seal_Rack" in row
                ? `/swab-master/edit/${row.slug}`
                : ""
            }
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
      name: "Equip Type",
      selector: (row) =>
        "TTD_tube_seal_rack" in row
          ? "TTD"
          : "BDD_tube_seal_rack" in row
          ? "BDD"
          : "calibration_orifice_set" in row
          ? "Calibration Stande"
          : "Swab_Master_Tube_Seal_Rack" in row
          ? "Swab Master"
          : "",
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Name",
      selector: (row) => row.alternate_name,
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
      selector: (row) => row.pm_status,
      sortable: true,
    },
    {
      name: "Location for Storage",
      selector: (row) => row.location_for_storage,
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
        <Card.Title className="mb-3">All Equipment</Card.Title>
        <div>
          <Filters
            warehouseNotNeeded={props.warehouseNotNeeded}
            changeUrl={(url) => {
              setFilterUrl(url);
              setPageNo(1);
              props.setRefreshTable(true);
            }}
          />
          {searchDate ? (
            <button onClick={clearFilter} className="btn btn-secondary">
              Clear Filter
            </button>
          ) : (
            ""
          )}
          <Form.Group
            controlId="formGroupEquipPrepDate"
            className={`mb-3 ${clss}`}
          >
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </Form.Group>
          {renderColBtns()}
          <DataTable
            paginationRowsPerPageOptions={[10, 30, 50, 75, 100, 125]}
            paginationPerPage={10}
            onChangePage={(page) => {
              setPageNo(page);
              setEquipData([]);
              props.setRefreshTable(true);
            }}
            columns={cols}
            data={equipData}
            onChangeRowsPerPage={(newPerPage, page) => {
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
            key={totalRows.current}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AllEquip;
