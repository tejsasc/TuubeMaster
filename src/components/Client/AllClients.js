import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useDTColumns from "../../hooks/useDTTable";
import LoadingData from "../UI/LoadingData";

const AllClients = (props) => {
  const [clients, setClients] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const totalRows = useRef(0);
  const [isFetchErr, setFetchErr] = useState(null);

  const getClients = async () => {
    setIsLoadingData(true);
    const response = await ajaxCall(
      `/cl/clientlist/?p=${pageNo}&records=${perPage}`,
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
      setClients([]);
      setFetchErr("Some Problem Occured Please try again");
      return;
    }
    totalRows.current = response.data?.count;
    setClients(response.data.results);
    setIsLoadingData(false);
    props.setRefreshTable(false);
  };

  useEffect(() => {
    console.log("---1-->", props.refreshTable);
    if (props.refreshTable) console.log("---2-->");
    getClients();
  }, [props.refreshTable, perPage, pageNo]);

  const columns = [
    {
      cell: (row) => (
        <>
          <Link
            className="projectAction"
            title="client Dashboard"
            to={`./${row.slug}`}
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
          </Link>
          <button className="projectAction" title="Edit Clients">
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
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Client Name",
      selector: (row) => row?.official_name,
      sortable: true,
    },
    {
      name: "Comman Name",
      selector: (row) => row?.comman_name,
      sortable: true,
    },
    {
      name: "Parent Company",
      selector: (row) => row?.parent_company,
      sortable: true,
    },
    {
      name: "Former Name",
      selector: (row) => row?.former_name,
      sortable: true,
    },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  return (
    <div className="col-md-12">
      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="mb-3">All Clients</Card.Title>
          {renderColBtns()}
          <DataTable
            paginationRowsPerPageOptions={[10, 30, 50, 75, 100, 125]}
            paginationPerPage={10}
            onChangePage={(page) => {
              setPageNo(page);
              setClients([]);
            }}
            columns={cols}
            data={clients}
            onChangeRowsPerPage={(newPerPage, page) => {
              setPerPage(newPerPage);
              setPageNo(page);
              setClients([]);
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
export default AllClients;
