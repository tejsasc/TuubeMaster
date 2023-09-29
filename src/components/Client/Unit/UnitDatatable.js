import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import useDTColumns from "../../../hooks/useDTTable";
import { useSelector } from "react-redux";
import LoadingData from "../../UI/LoadingData";
import { ajaxCall } from "../../../helpers/ajaxCall";
import { Link } from "react-router-dom";

const UnitDatatable = (props) => {
  const [equipData, setEquipData] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const totalRows = useRef(0);
  const [isFetchErr, setFetchErr] = useState(null);

  const getUnits = async (props) => {
    setIsLoadingData(true);
    let url = `/cl/unitlist/?p=${pageNo}&records=${perPage}`;
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
    if (response.status !== 200) {
      setIsLoadingData(false);
      setEquipData([]);
      setFetchErr("Some Problem Occurred Please try again");
      return;
    }
    totalRows.current = response.data?.count;
    setEquipData(response.data.results);
    setIsLoadingData(false);
  };

  useEffect(() => {
    console.log("---1-->", props.refreshTable);
    if (props.refreshTable) console.log("---2-->");
    getUnits();
  }, [props.refreshTable, perPage, pageNo]);

  const columns = [
    {
      cell: (row) => (
        <>
          <Link className="projectAction" title="Edit">
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
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Client Name",
      selector: (row) => row.client,
      sortable: true,
    },
    {
      name: "Plant Name",
      selector: (row) => row.plant,
      sortable: true,
    },
    {
      name: "Unit Name",
      selector: (row) => row.name_of_unit,
      sortable: true,
    },
    {
      name: "Chemical Being Manufactured By This Unit",
      selector: (row) => row.chemical_being_manufactured_by_this_unit,
    },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);
  return (
    <div className="col-md-12">
      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="mb-3">All Units</Card.Title>
          {renderColBtns()}
          <DataTable
            paginationRowsPerPageOptions={[10, 30, 50, 75, 100, 125]}
            paginationPerPage={10}
            onChangePage={(page) => {
              setPageNo(page);
              setEquipData([]);
            }}
            columns={cols}
            data={equipData}
            onChangeRowsPerPage={(newPerPage, page) => {
              setPerPage(newPerPage);
              setPageNo(page);
            }}
            pagination
            paginationServer
            progressPending={isLoadingData}
            progressComponent={<LoadingData className="loading-spinner-flex" />}
            paginationTotalRows={totalRows.current}
            key={totalRows.current}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
export default UnitDatatable;
