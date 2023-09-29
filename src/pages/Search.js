import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import LoadingData from "../components/UI/LoadingData";
import { ajaxCall } from "../helpers/ajaxCall";
import { useSelector } from "react-redux";
import useDTColumns from "../hooks/useDTTable";

const Search = () => {
  // false : eq & true : parts
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let clss = "col-md-4";
  const [toggleEP, setToggleEP] = useState(false);
  const [searchDate, setSearchDate] = useState(
    `${year}-${String(month).padStart(2, 0)}-${day}`
  );
  const [search, setSearch] = useState("");
  const toggleEquiParts = function () {
    setToggleEP((data) => !data);
  };

  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [equipPartData, setEquipPartData] = useState([]);
  const [isFetchErr, setFetchErr] = useState(null);
  const totalRows = useRef(0);
  const authData = useSelector((state) => state.authStore);

  const getData = async function (url) {
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
      setEquipPartData([]);
      setFetchErr("Some Problem Occured Please try again");
      return;
    }
    totalRows.current = response.data?.count;
    setEquipPartData(response.data?.results.results);
    setIsLoadingData(false);
  };

  useEffect(() => {
    // verifying it's date
    if (new Date(searchDate) instanceof Date) {
      const url = `/wef/?p=${pageNo}&records=${perPage}&date=${searchDate}&search=${search}`;
      getData(url);
    }
  }, [searchDate, pageNo, perPage, search]);

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
            title="Edit Equipment"
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
      name: "Warehouse",
      selector: (row) => row.location_for_warehouse,
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
        <Card.Title className="mb-3">
          <h3 className="text-center">Search</h3>
        </Card.Title>
        <hr />

        <div className="text-center">
          <Button
            variant={toggleEP ? "outline-primary" : "primary"}
            onClick={toggleEquiParts}
          >
            Equipments
          </Button>
          <Button
            variant={toggleEP ? "primary" : "outline-primary"}
            className="ml-3"
            onClick={toggleEquiParts}
          >
            Part
          </Button>
          <div className="row mt-3">
            <Form.Group
              className={`mb-3 ${clss}`}
              controlId="formGroupEquipPrepDate"
            >
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className={`mb-3 ${clss}`}
              controlId="formGroupEquipPrepDate"
            >
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Form.Group>
          </div>
          {renderColBtns()}
          <DataTable
            paginationRowsPerPageOptions={[10, 30, 50, 75, 100, 125]}
            paginationPerPage={10}
            onChangePage={(page) => {
              setPageNo(page);
              setEquipPartData([]);
            }}
            columns={cols}
            data={equipPartData}
            onChangeRowsPerPage={(newPerPage, page) => {
              setPerPage(newPerPage);
              setPageNo(page);
              setEquipPartData([]);
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

export default Search;
