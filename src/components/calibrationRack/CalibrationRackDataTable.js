import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ajaxCall } from "../../helpers/ajaxCall";
import LoadingData from "../UI/LoadingData";
import Filters from "../UI/Form/Filters";
import { uiAction } from "../../store/uiStore";
import DismentalPopup from "../UI/DismentalPopup";
import PopOverPMstatus from "../PopOverPMstatus";
import useDTColumns from "../../hooks/useDTTable";

const CalibrationRackDataTable = (props) => {
  const [equipData, setEquipData] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  // const [promptStatus, setPromptStatus] = useState(false);
  const totalRows = useRef(0);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFetchErr, setFetchErr] = useState(null);
  const [filterUrl, setFilterUrl] = useState("");
  const [popup, setpopup] = useState("");

  const getEquip = async () => {
    setIsLoadingData(true);
    let url = `/eq/calibrationlist/?ordering=-created_at&p=${pageNo}&records=${perPage}${filterUrl}`;
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

  const dismentalEquipPopup = function (id, name, part1) {
    setpopup(
      <DismentalPopup
        dismentalEquip={dismentalEquip}
        id={id}
        name={name}
        setpopup={setpopup}
        data={[{ name: "Calibration Orifice Set", val: part1 }]}
      />
    );
  };
  const dismentalEquip = async function (id, name) {
    let url = `/eq/calibrationretupddel/${id}/`,
      method = "PATCH";
    const data = new FormData();
    data.append("calibration_orifice_set", "");
    const response = await ajaxCall(
      url,
      {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method,
        body: data,
        // signal,
      },
      8000
      // timeoutfun
    );
    // console.log(response);
    if (response.status === 200) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "Calibration Rack",
          msg: `Calibration Rack ${name} Dismantled Successfully`,
        })
      );
      setpopup();
    }
    props.setRefreshTable(true);
  };

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
            to={`/calibration-stand/edit/${row.slug}`}
            className="projectAction"
            title="Edit Calibration Rack"
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
      name: "",
      // selector: (row) => row.alternate_name,
      cell: (row) => (
        <>
          {row.calibration_orifice_set ? (
            <button
              className={`btn btn-danger fs14`}
              title="Dismantle"
              onClick={() => {
                // dismentalEquip(row.id, row.alternate_name);
                dismentalEquipPopup(
                  row.slug,
                  row.alternate_name,
                  row.calibration_orifice_set
                );
                // promptDelete(row.projectName, row.id);
                // deleteEnquiry(row.id);
              }}
            >
              Dismantle
            </button>
          ) : (
            <p className="text-center" style={{ width: "100%" }}>
              -
            </p>
          )}
        </>
      ),
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
      selector: (row) => (
        <PopOverPMstatus
          pm_status={row.pm_status}
          id={row.id}
          url={`/eq/calibrationretupddel/${row.id}/`}
          name="Calibration Rack"
          setRefreshTable={props.setRefreshTable}
        />
      ),
      sortable: true,
    },

    {
      name: "Location for Warehouse",
      selector: (row) => row.location_for_warehouse,
    },
    {
      name: "Location for Storage",
      selector: (row) => row.location_for_storage,
    },
    {
      name: "Calibration Orifice Set",
      selector: (row) => row.calibration_orifice_set,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
    },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="mb-3">All Calibration Rack</Card.Title>
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
              progressComponent={
                <LoadingData className="loading-spinner-flex" />
              }
              paginationTotalRows={totalRows.current}
            />
          </div>
        </Card.Body>
      </Card>
      {popup}
    </>
  );
};

export default CalibrationRackDataTable;
